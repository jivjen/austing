import fs from "node:fs";
import path from "node:path";

const GITHUB_API = "https://api.github.com";

function env(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

function repoConfig() {
  return {
    token: env("GITHUB_TOKEN"),
    owner: env("GITHUB_OWNER"),
    repo: env("GITHUB_REPO"),
    branch: process.env.GITHUB_BRANCH || "main",
  };
}

async function githubFetch(url: string, init?: RequestInit) {
  const { token } = repoConfig();
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers || {}),
    },
  });
}

/** Best-effort local mirror so `npm run dev` reflects a save immediately.
 *  Silently ignored on read-only filesystems (deployed serverless functions). */
function mirrorLocally(filePath: string, buffer: Buffer) {
  try {
    const localPath = path.join(process.cwd(), filePath);
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    fs.writeFileSync(localPath, buffer);
  } catch {
    // read-only fs — fine, the redeploy will pick this up
  }
}

async function getFileSha(filePath: string): Promise<string | null> {
  const { owner, repo, branch } = repoConfig();
  const res = await githubFetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub getFileSha failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  return data.sha as string;
}

async function getFileJson<T>(filePath: string): Promise<{ data: T; sha: string }> {
  const { owner, repo, branch } = repoConfig();
  const res = await githubFetch(
    `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`
  );
  if (!res.ok) {
    throw new Error(`GitHub getFileJson failed (${res.status}): ${await res.text()}`);
  }
  const file = await res.json();
  const content = Buffer.from(file.content, "base64").toString("utf8");
  return { data: JSON.parse(content) as T, sha: file.sha };
}

/** Commit an arbitrary binary/text file (e.g. an uploaded image). */
export async function commitFile(
  filePath: string,
  contentBuffer: Buffer,
  message: string
): Promise<void> {
  const { owner, repo, branch } = repoConfig();
  const sha = await getFileSha(filePath);
  const res = await githubFetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: contentBuffer.toString("base64"),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub commitFile failed (${res.status}): ${await res.text()}`);
  }
  mirrorLocally(filePath, contentBuffer);
}

/** Read-modify-write a JSON file in one commit, fetching a fresh sha first
 *  to avoid clobbering a concurrent edit. */
export async function commitJsonFile<T>(
  filePath: string,
  message: string,
  update: (current: T) => T
): Promise<T> {
  const { data, sha } = await getFileJson<T>(filePath);
  const updated = update(data);
  const { owner, repo, branch } = repoConfig();
  const buffer = Buffer.from(JSON.stringify(updated, null, 2) + "\n", "utf8");
  const res = await githubFetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`, {
    method: "PUT",
    body: JSON.stringify({
      message,
      content: buffer.toString("base64"),
      branch,
      sha,
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub commitJsonFile failed (${res.status}): ${await res.text()}`);
  }
  mirrorLocally(filePath, buffer);
  return updated;
}

"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/studio/logout", { method: "POST" });
    router.push("/studio/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="font-body text-xs text-white/50 hover:text-white transition-colors text-left"
    >
      Log out
    </button>
  );
}

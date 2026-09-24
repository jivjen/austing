"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionKey } from "@/lib/content/types";

export function useSectionDraft<T>(section: SectionKey, initial: T) {
  const storageKey = `studio-draft:${section}`;
  const [data, setDataState] = useState<T>(initial);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const restored = useRef(false);

  useEffect(() => {
    if (restored.current) return;
    restored.current = true;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        setDataState(JSON.parse(raw) as T);
        setDirty(true);
      }
    } catch {
      // ignore corrupt draft
    }
  }, [storageKey]);

  const setData = useCallback(
    (next: T | ((prev: T) => T)) => {
      setDataState((prev) => {
        const value = typeof next === "function" ? (next as (prev: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(value));
        } catch {
          // ignore quota errors
        }
        return value;
      });
      setDirty(true);
      setError(null);
    },
    [storageKey]
  );

  const discard = useCallback(() => {
    setDataState(initial);
    setDirty(false);
    setError(null);
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [initial, storageKey]);

  const save = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Save failed");
      }
      setDirty(false);
      setSavedAt(new Date());
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // ignore
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [section, data, storageKey]);

  return { data, setData, dirty, saving, error, savedAt, save, discard };
}

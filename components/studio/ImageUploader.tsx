"use client";

import { useRef, useState } from "react";

interface ImageUploaderProps {
  value: string;
  onChange: (path: string) => void;
  folder: string;
  label?: string;
}

const MAX_DIMENSION = 1600;

function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const scale = MAX_DIMENSION / Math.max(width, height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Canvas not supported"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error("Could not process image"));
        },
        "image/jpeg",
        0.85
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

export default function ImageUploader({
  value,
  onChange,
  folder,
  label = "Image",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file: File | undefined | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const resized = await resizeImage(file);
      const form = new FormData();
      form.append("file", resized, file.name);
      form.append("folder", folder);
      const res = await fetch("/api/studio/upload", { method: "POST", body: form });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Upload failed");
      }
      const body = await res.json();
      onChange(body.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="block font-body text-[11px] tracking-[0.15em] uppercase text-burgundy/60 mb-2">
        {label}
      </span>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex items-center justify-center rounded-sm border-2 border-dashed cursor-pointer transition-colors overflow-hidden aspect-square bg-blush/20 ${
          dragOver ? "border-gold bg-blush/40" : "border-burgundy/15 hover:border-burgundy/30"
        }`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <p className="font-body text-xs text-burgundy/40 text-center px-4">
            {uploading ? "Uploading..." : "Click or drag an image here"}
          </p>
        )}
        {uploading && value && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <p className="font-body text-xs text-burgundy">Uploading...</p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="font-body text-xs text-red-600 mt-2">{error}</p>}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="font-body text-xs text-burgundy/50 hover:text-burgundy mt-2 underline"
        >
          Remove image
        </button>
      )}
    </div>
  );
}

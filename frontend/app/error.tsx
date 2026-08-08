"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Next.js Error Boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
      <p className="text-xs text-zinc-400 mb-4">{error?.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-semibold text-white transition"
      >
        Try again
      </button>
    </div>
  );
}

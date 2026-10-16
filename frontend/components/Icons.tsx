import React from "react";

export function SparkIcon({ className = "size-5" }: { className?: string }) {
  return (
    <img
      src="/brand/logo.png"
      alt="Ganesh NexGen Logo"
      className={`${className} object-contain inline-block select-none`}
    />
  );
}

export function AsteriskBadge({ className = "size-4" }: { className?: string }) {
  return (
    <img
      src="/brand/logo.png"
      alt="GN"
      className={`${className} object-contain inline-block select-none`}
    />
  );
}

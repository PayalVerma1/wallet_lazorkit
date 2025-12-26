"use client";

import { useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative border border-white/15 rounded-lg bg-black overflow-hidden">
      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute top-3 right-3 text-xs px-3 py-1 rounded-md border border-white/20 text-white/70 hover:text-white hover:border-white transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>

      {/* Code */}
      <pre className="p-5 text-sm text-orange-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

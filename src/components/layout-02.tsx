"use client";

import Link from "next/link";

export function ExampleLayout({
  title,
  description,
  learnPoints,
  children,
  howItWorks,
}: {
  title: string;
  description: string;
  learnPoints: string[];
  howItWorks: { title: string; text: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Back link */}
        <Link
          href="/"
          className="text-sm text-white hover:text-gray-400 transition"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-gray-400 max-w-2xl">{description}</p>
        </div>

        {/* Learn + Try */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What You'll Learn */}
          <div className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              What You’ll Learn
            </h2>
            <ul className="space-y-2 text-sm text-gray-400">
              {learnPoints.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-medium">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Try It Yourself */}
          <div className="rounded-xl border border-gray-200 p-6 flex items-center justify-center">
            {children}
          </div>
        </div>

        {/* How It Works */}
        <div className="rounded-xl border border-gray-200 p-6 space-y-4">
          <h2 className="text-xl font-semibold">How It Works</h2>

          {howItWorks.map((step, i) => (
            <div key={i} className="space-y-1">
              <h3 className="font-medium">
                {i + 1}. {step.title}
              </h3>
              <p className="text-sm text-gray-400">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

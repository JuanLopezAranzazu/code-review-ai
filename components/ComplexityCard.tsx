"use client";

import type { ComplexityAnalysis } from "../types/analysis";

const LEVEL_COLOR: Record<ComplexityAnalysis["level"], string> = {
  baja: "var(--color-good)",
  media: "var(--color-warn)",
  alta: "var(--color-bad)",
  "muy alta": "var(--color-bad)",
};

export function ComplexityCard({ complexity }: { complexity: ComplexityAnalysis }) {
  const color = LEVEL_COLOR[complexity.level];
  const bars = 10;
  const filled = Math.max(0, Math.min(10, Math.round(complexity.score)));

  return (
    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
            Complejidad
          </p>
          <p className="mt-1 text-lg font-medium capitalize" style={{ color }}>
            {complexity.level}
          </p>
        </div>
        <span className="font-mono text-2xl font-semibold tabular-nums" style={{ color }}>
          {complexity.score}
          <span className="text-sm text-[var(--color-text-faint)]">/10</span>
        </span>
      </div>

      <div className="mt-3 flex gap-1">
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className="h-2 flex-1 rounded-full"
            style={{
              backgroundColor: i < filled ? color : "var(--color-border)",
            }}
          />
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
        {complexity.explanation}
      </p>
    </div>
  );
}

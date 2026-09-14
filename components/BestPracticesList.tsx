"use client";

import { Check, X } from "lucide-react";
import type { BestPractice } from "../types/analysis";

export function BestPracticesList({ practices }: { practices: BestPractice[] }) {
  if (practices.length === 0) {
    return (
      <p className="text-sm text-[var(--color-text-muted)]">
        No hay buenas prácticas evaluadas para este código.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {practices.map((p, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-3.5"
        >
          <span
            className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: p.followed ? "var(--color-good-muted)" : "var(--color-bad-muted)",
            }}
          >
            {p.followed ? (
              <Check className="size-3.5" style={{ color: "var(--color-good)" }} />
            ) : (
              <X className="size-3.5" style={{ color: "var(--color-bad)" }} />
            )}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium text-[var(--color-text)]">{p.title}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-muted)]">
              {p.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

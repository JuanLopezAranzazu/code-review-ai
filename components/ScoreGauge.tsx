"use client";

interface ScoreGaugeProps {
  score: number; // 0-100
}

function scoreColor(score: number): string {
  if (score >= 80) return "var(--color-good)";
  if (score >= 55) return "var(--color-warn)";
  return "var(--color-bad)";
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excelente";
  if (score >= 80) return "Muy bueno";
  if (score >= 65) return "Aceptable";
  if (score >= 45) return "Necesita mejoras";
  return "Requiere atención";
}

export function ScoreGauge({ score }: ScoreGaugeProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const color = scoreColor(clamped);

  return (
    <div className="flex items-center gap-4">
      <div className="relative size-[120px] shrink-0">
        <svg viewBox="0 0 120 120" className="size-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease, stroke 0.3s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-semibold tabular-nums" style={{ color }}>
            {Math.round(clamped)}
          </span>
          <span className="text-[10px] uppercase tracking-wide text-[var(--color-text-faint)]">
            / 100
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
          Puntuación general
        </p>
        <p className="mt-1 text-lg font-medium" style={{ color }}>
          {scoreLabel(clamped)}
        </p>
      </div>
    </div>
  );
}

export type Severity = "info" | "warning" | "critical";

export interface Suggestion {
  title: string;
  description: string;
  severity: Severity;
  line?: number;
}

export interface BestPractice {
  title: string;
  description: string;
  followed: boolean;
}

export interface ComplexityAnalysis {
  level: "baja" | "media" | "alta" | "muy alta";
  score: number; // 1-10
  explanation: string;
}

export interface CodeAnalysis {
  score: number; // 0-100
  summary: string;
  suggestions: Suggestion[];
  bestPractices: BestPractice[];
  complexity: ComplexityAnalysis;
  strengths: string[];
}

export interface AnalyzeRequest {
  code: string;
  language: string;
}

export interface AnalyzeErrorResponse {
  error: string;
}

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// Esta ruta corre siempre en el servidor (Route Handler), así que
// GROQ_API_KEY nunca se expone al navegador.

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

const groq = new Groq({ apiKey: GROQ_API_KEY || "missing-groq-api-key" });

const SYSTEM_PROMPT = `Eres un revisor de código senior, experto en múltiples lenguajes de programación, buenas prácticas, patrones de diseño, seguridad y rendimiento.

Analiza el código que te entrega el usuario y responde EXCLUSIVAMENTE con un objeto JSON válido (sin texto adicional, sin markdown, sin backticks) que cumpla EXACTAMENTE este esquema TypeScript:

{
  "score": number,               // 0-100, calidad general del código
  "summary": string,             // resumen breve (2-4 frases) en español, claro y directo
  "suggestions": [
    {
      "title": string,           // título corto de la sugerencia
      "description": string,     // explicación concreta y accionable
      "severity": "info" | "warning" | "critical",
      "line": number | null      // línea aproximada si aplica, o null
    }
  ],
  "bestPractices": [
    {
      "title": string,           // nombre de la práctica (ej. "Nombres descriptivos")
      "description": string,     // por qué importa en este código concreto
      "followed": boolean        // si el código la cumple o no
    }
  ],
  "complexity": {
    "level": "baja" | "media" | "alta" | "muy alta",
    "score": number,             // 1-10
    "explanation": string        // justificación breve (complejidad ciclomática, anidamiento, etc.)
  },
  "strengths": string[]          // lista breve de puntos fuertes del código
}

Reglas:
- Responde siempre en español.
- Sé específico y basado en el código real proporcionado, nunca genérico.
- Incluye entre 3 y 7 "suggestions" y entre 3 y 6 "bestPractices", priorizando lo más relevante.
- Si el código está vacío o no es código real, refleja eso honestamente en el summary y usa score bajo.
- No inventes líneas de código que no existen.
- No incluyas ningún texto fuera del JSON.`;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const code = body?.code;
    const language = body?.language;

    if (typeof code !== "string" || code.trim().length === 0) {
      return NextResponse.json(
        { error: "El campo 'code' es requerido y no puede estar vacío." },
        { status: 400 }
      );
    }

    if (!GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Falta configurar GROQ_API_KEY en el servidor. Revisa el archivo .env.local." },
        { status: 500 }
      );
    }

    const truncatedCode = code.slice(0, 20000);

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      temperature: 0.2,
      max_tokens: 3000,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Lenguaje declarado: ${language || "desconocido"}\n\nCódigo a analizar:\n\`\`\`${
            language || ""
          }\n${truncatedCode}\n\`\`\``,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;

    if (!raw) {
      return NextResponse.json(
        { error: "El modelo no devolvió contenido. Intenta nuevamente." },
        { status: 502 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error("[api/analyze] Respuesta no JSON del modelo:", raw);
      return NextResponse.json(
        { error: "El modelo devolvió una respuesta con formato inválido." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("[api/analyze] Error analizando código:", err);
    const message = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error del servidor al contactar Groq: ${message}` },
      { status: 500 }
    );
  }
}

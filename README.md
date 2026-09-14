# Code Review AI

Revisión de código asistida por IA: pega o escribe código en el editor y obtén un
**score**, **resumen**, **sugerencias**, **buenas prácticas** y **nivel de complejidad**,
generados por un modelo de IA a través de **Groq**.

Esta es la versión **Next.js (App Router)** del proyecto: el mismo frontend que la
versión Vite, pero con el backend integrado como **Route Handler** de Next
(`src/app/api/analyze/route.ts`) en lugar de un servidor Express aparte.

## Stack

- **Next.js 16 (App Router) + React 19 + TypeScript**
- **Tailwind CSS v4** (paleta de colores 100% personalizable vía variables CSS en
  `src/app/globals.css`)
- **Radix UI** (`radix-ui`, paquete unificado) para Select, Tabs y Tooltip accesibles
- **CodeMirror 6** (`@uiw/react-codemirror`) como editor de código, con soporte para
  TypeScript, JavaScript, Python, Java, C++, PHP, Rust, HTML y CSS
- **Route Handler de Next** (`/api/analyze`) que llama a Groq desde el servidor, así la
  `GROQ_API_KEY` nunca se expone en el navegador
- **Groq SDK** usando el modelo `openai/gpt-oss-120b` (configurable)
- **next/font** con Public Sans (UI) y JetBrains Mono (código), auto-hospedadas por Next

## Estructura

```
code-review-ai-next/
├── src/
│   ├── app/
│   │   ├── api/analyze/route.ts   # backend: POST /api/analyze (llama a Groq)
│   │   ├── layout.tsx             # fuentes (next/font) + metadata
│   │   ├── page.tsx               # página principal ("use client")
│   │   └── globals.css            # paleta de colores y tema (variables CSS)
│   ├── components/                # CodeEditor, LanguageSelect, ResultsPanel, etc.
│   ├── hooks/
│   │   └── useAnalyzeCode.ts
│   ├── lib/
│   │   ├── languages.ts           # lenguajes soportados por el editor
│   │   └── utils.ts
│   └── types/
│       └── analysis.ts            # tipos compartidos del análisis
└── .env.example
```

## Configuración

1. Instala dependencias:

   ```bash
   pnpm install
   ```

2. Copia el archivo de variables de entorno y coloca tu API key de Groq. Next.js usa
   `.env.local` para desarrollo:

   ```bash
   cp .env.example .env.local
   ```

   ```env
   # Groq
   GROQ_API_KEY=tu_api_key_de_groq
   GROQ_MODEL=openai/gpt-oss-120b
   ```

   Puedes obtener una API key gratuita en [console.groq.com](https://console.groq.com/keys).

3. Levanta el servidor de desarrollo:

   ```bash
   pnpm dev
   ```

   Abre `http://localhost:3000`. El frontend y la API (`/api/analyze`) corren en el
   mismo proceso de Next, sin necesidad de CORS ni proxy.

## Cómo funciona el análisis

El componente `page.tsx` envía el código y el lenguaje seleccionado a
`POST /api/analyze`. El Route Handler arma un prompt de sistema que obliga al modelo a
responder **únicamente JSON** con este esquema:

```ts
{
  score: number;            // 0-100
  summary: string;
  suggestions: Array<{ title; description; severity: "info"|"warning"|"critical"; line? }>;
  bestPractices: Array<{ title; description; followed: boolean }>;
  complexity: { level: "baja"|"media"|"alta"|"muy alta"; score: number; explanation: string };
  strengths: string[];
}
```

Se usa `response_format: { type: "json_object" }` de Groq para forzar salida JSON válida,
y el Route Handler valida/parsea antes de devolverlo al cliente.

## Personalizar la paleta de colores

Toda la paleta vive en `src/app/globals.css`, en el bloque `:root`. Cambia únicamente los
valores hexadecimales — el resto de la app (componentes, editor, badges de severidad,
gauge de score) consume esas variables automáticamente:

```css
:root {
  --color-bg: #14121a;
  --color-brand: #ff6b57;
  --color-good: #8bc76a;
  --color-warn: #e8a33d;
  --color-bad: #e2604f;
  /* ...etc */
}
```

## Build y despliegue

```bash
pnpm build
pnpm start
```

Al desplegar (Vercel, Docker, un VPS, etc.), configura `GROQ_API_KEY` y `GROQ_MODEL` como
variables de entorno del entorno de ejecución — no necesitas ningún servidor adicional,
el Route Handler ya corre como parte de Next.

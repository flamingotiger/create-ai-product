# Next AI Basic

A minimal Next.js App Router starter for building an AI product quickly.

## Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

This project was generated with `__PROVIDER_LABEL__` selected:

```env
AI_PROVIDER=__AI_PROVIDER__
__API_KEY_NAME__=your_api_key_here
__MODEL_ENV_NAME__=__MODEL_NAME__
```

The full `.env.local` can include both providers so you can switch later:

```env
AI_PROVIDER=__AI_PROVIDER__
OPENAI_API_KEY=
GEMINI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
GEMINI_MODEL=gemini-1.5-flash
```

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Change Provider

Change `AI_PROVIDER` in `.env.local`:

```env
AI_PROVIDER=openai
```

or:

```env
AI_PROVIDER=gemini
```

Then set the matching API key:

- OpenAI: `OPENAI_API_KEY`
- Gemini: `GEMINI_API_KEY`

You can change models without editing code:

- OpenAI: `OPENAI_MODEL`
- Gemini: `GEMINI_MODEL`

## Streaming Chat API

`POST /api/chat`

The chat UI in `components/chat.tsx` uses `useChat` and streams responses from this route.

Request body:

```ts
{
  messages: UIMessage[];
}
```

The route uses:

- `getModel()` for provider-independent model selection
- `streamText()` for streamed text generation
- AI SDK UI message streams for the response

## Structured Output API

`POST /api/structured`

The structured output demo in `components/structured-output.tsx` sends a service idea and renders the JSON result.

Request body:

```json
{
  "idea": "An AI assistant that turns customer interviews into product requirement drafts."
}
```

Response shape:

```ts
{
  title: string;
  summary: string;
  targetUsers: string[];
  coreFeatures: string[];
  difficulty: "low" | "medium" | "high";
  monetizationIdeas: string[];
}
```

The route uses `zod` and `generateObject()` to produce typed JSON.

## Before Deploying

- Set production environment variables in your hosting provider.
- Keep only the provider keys you actually use.
- Confirm `AI_PROVIDER` matches the key and model you configured.
- Run `npm run typecheck`.
- Run `npm run build`.
- Review API error messages before exposing the app publicly.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- OpenAI provider
- Google Gemini provider

This v0.1 template intentionally does not include a database, auth, payments, or RAG.

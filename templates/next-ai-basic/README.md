# Next AI Basic

A minimal Next.js App Router starter for building an AI product quickly.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- OpenAI provider
- Google Gemini provider

This v0.1 template intentionally does not include a database, auth, payments, or RAG.

## Getting Started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Set `AI_PROVIDER` to `openai` or `gemini`, then provide the matching API key.
Use `OPENAI_MODEL` or `GEMINI_MODEL` to change the model without editing code.

This project was generated with `__PROVIDER_LABEL__` selected:

```env
AI_PROVIDER=__AI_PROVIDER__
__API_KEY_NAME__=your_api_key_here
__MODEL_ENV_NAME__=__MODEL_NAME__
```

## API Routes

- `POST /api/chat`: basic text response endpoint for the chat UI.
- `POST /api/structured`: returns a typed JSON product analysis from `{ idea: string }`.

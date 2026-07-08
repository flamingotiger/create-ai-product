# create-ai-product

Start a production-ready AI product with Next.js, TypeScript, AI SDK, and your preferred AI provider in minutes.

`create-ai-product` is an open-source CLI for generating a focused AI product starter. It gives you a clean Next.js App Router project with provider switching, a streaming chat demo, and a structured output demo without pulling in heavy product infrastructure too early.

## Usage

```bash
npx create-ai-product my-app
```

Then follow the prompts:

```bash
cd my-app
npm install
cp .env.example .env.local
npm run dev
```

## What's Included

- Next.js App Router
- TypeScript
- Tailwind CSS
- AI SDK
- OpenAI / Gemini provider switch
- Streaming Chat example
- Structured Output example

## What's Not Included Yet

v0.1 intentionally keeps the starter small. These are planned for v0.2 and later:

- Auth
- Payments
- Database
- RAG

## Roadmap

- v0.1: Minimal AI product starter with provider switching, streaming chat, and structured output.
- v0.2: Add optional Auth, Database, Payments, and RAG templates.
- v0.3: Add template selection, deployment presets, and richer examples.
- Future: More providers, production hardening guides, and community templates.

## Contributing

Contributions are welcome. Good first contributions include:

- Improving templates
- Adding tests for CLI behavior
- Improving docs
- Reporting provider or dependency compatibility issues

To work locally:

```bash
pnpm install
pnpm run build
node dist/index.js my-app
```

## License

MIT

import { Chat } from "@/components/chat";
import { StructuredOutput } from "@/components/structured-output";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Next AI Basic
        </p>
        <div className="grid gap-4 md:grid-cols-[1fr_280px] md:items-end">
          <div>
            <h1 className="text-4xl font-semibold tracking-normal text-neutral-950 md:text-6xl">
              Start a focused AI product.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
              A minimal App Router template with provider switching, one chat endpoint,
              one structured output endpoint, and room for shadcn/ui.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
                href="#streaming-chat"
              >
                Try streaming chat
              </a>
              <a
                className="rounded-md border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 transition hover:bg-neutral-50"
                href="#structured-output"
              >
                View structured output
              </a>
            </div>
          </div>
          <div className="rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-sm">
            <p className="font-medium text-neutral-950">Included</p>
            <p className="mt-2">
              Next.js, Tailwind CSS, Vercel AI SDK, OpenAI, Gemini.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-4" id="streaming-chat">
        <Chat />
      </section>

      <section
        className="grid gap-3 rounded-md border border-neutral-200 bg-white p-4 shadow-sm"
        id="structured-output"
      >
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">Structured Output</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            Enter a service idea and get a typed JSON product analysis from the selected
            model.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <code className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
            POST /api/structured
          </code>
          <code className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
            {"{ idea: string }"}
          </code>
        </div>
        <StructuredOutput />
      </section>
    </main>
  );
}

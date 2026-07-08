import { Chat } from "@/components/chat";

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
              A minimal App Router template with provider switching, one chat
              endpoint, one structured output endpoint, and room for shadcn/ui.
            </p>
          </div>
          <div className="rounded-md border border-neutral-200 bg-white p-4 text-sm text-neutral-600 shadow-sm">
            <p className="font-medium text-neutral-950">Included</p>
            <p className="mt-2">Next.js, Tailwind CSS, Vercel AI SDK, OpenAI, Gemini.</p>
          </div>
        </div>
      </header>

      <Chat />
    </main>
  );
}

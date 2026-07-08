"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { FormEvent, useState } from "react";

export function Chat() {
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat"
    })
  });
  const [input, setInput] = useState("");

  const isLoading = status === "submitted" || status === "streaming";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || status !== "ready") {
      return;
    }

    sendMessage({ text: message });
    setInput("");
  }

  return (
    <section className="grid gap-4 rounded-md border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-neutral-950">Streaming Chat</h2>
          <p className="text-sm text-neutral-500">
            Test your selected model with a live streamed response.
          </p>
        </div>
        {isLoading ? (
          <button
            className="rounded-md border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            onClick={stop}
            type="button"
          >
            Stop
          </button>
        ) : null}
      </div>

      <div className="grid max-h-[520px] min-h-[320px] gap-3 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="mr-auto max-w-[85%] rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-800">
            Tell me the AI product you want to build, and I will help shape it.
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-md bg-neutral-950 px-4 py-3 text-sm leading-6 text-white"
                : "mr-auto max-w-[85%] rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-800"
            }
            key={message.id}
          >
            {message.parts.map((part, index) =>
              part.type === "text" ? (
                <span className="whitespace-pre-wrap" key={index}>
                  {part.text}
                </span>
              ) : null
            )}
          </div>
        ))}

        {isLoading ? (
          <p className="text-sm text-neutral-500">Streaming response...</p>
        ) : null}
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Something went wrong. Check your provider config and API key.
        </p>
      ) : null}

      <form className="grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
        <textarea
          className="min-h-24 resize-none rounded-md border border-neutral-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
          disabled={status !== "ready"}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Describe your AI product idea..."
          value={input}
        />
        <button
          className="h-12 rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 md:self-end"
          disabled={status !== "ready" || !input.trim()}
          type="submit"
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </section>
  );
}

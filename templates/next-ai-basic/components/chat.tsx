"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function Chat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Tell me the AI product you want to build, and I will help shape it."
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || isLoading) {
      return;
    }

    setInput("");
    setIsLoading(true);
    setMessages((current) => [...current, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = (await response.json()) as { text?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "The chat request failed.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.text ?? "I could not generate a response."
        }
      ]);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: message
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4 rounded-md border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="grid max-h-[520px] min-h-[320px] gap-3 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div
            className={
              message.role === "user"
                ? "ml-auto max-w-[85%] rounded-md bg-neutral-950 px-4 py-3 text-sm leading-6 text-white"
                : "mr-auto max-w-[85%] rounded-md border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm leading-6 text-neutral-800"
            }
            key={`${message.role}-${index}`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form className="grid gap-3 md:grid-cols-[1fr_auto]" onSubmit={handleSubmit}>
        <textarea
          className="min-h-24 resize-none rounded-md border border-neutral-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Describe your AI product idea..."
          value={input}
        />
        <button
          className="h-12 rounded-md bg-neutral-950 px-5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60 md:self-end"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </section>
  );
}

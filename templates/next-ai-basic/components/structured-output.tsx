"use client";

import { FormEvent, useState } from "react";

type ProductAnalysis = {
  title: string;
  summary: string;
  targetUsers: string[];
  coreFeatures: string[];
  difficulty: "low" | "medium" | "high";
  monetizationIdeas: string[];
};

export function StructuredOutput() {
  const [idea, setIdea] = useState("");
  const [analysis, setAnalysis] = useState<ProductAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = idea.trim();

    if (!value || isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/structured", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea: value })
      });

      const data = (await response.json()) as ProductAnalysis | { error?: string };

      if (!response.ok) {
        throw new Error("error" in data ? data.error : "Request failed.");
      }

      setAnalysis(data as ProductAnalysis);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <textarea
          className="min-h-28 resize-none rounded-md border border-neutral-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/10"
          onChange={(event) => setIdea(event.target.value)}
          placeholder="Example: An AI assistant that turns customer interviews into product requirement drafts."
          value={idea}
        />
        <button
          className="w-fit rounded-md bg-neutral-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isLoading || !idea.trim()}
          type="submit"
        >
          {isLoading ? "Analyzing..." : "Generate JSON"}
        </button>
      </form>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {analysis ? (
        <div className="grid gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-4">
          <div>
            <p className="text-sm font-medium text-neutral-500">JSON result</p>
            <h3 className="mt-1 text-xl font-semibold text-neutral-950">
              {analysis.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-700">
              {analysis.summary}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ResultList title="Target users" values={analysis.targetUsers} />
            <ResultList title="Core features" values={analysis.coreFeatures} />
            <ResultList title="Monetization" values={analysis.monetizationIdeas} />
            <div className="rounded-md border border-neutral-200 bg-white p-3">
              <p className="text-sm font-medium text-neutral-950">Difficulty</p>
              <p className="mt-2 text-sm capitalize text-neutral-700">
                {analysis.difficulty}
              </p>
            </div>
          </div>

          <pre className="overflow-x-auto rounded-md bg-neutral-950 p-4 text-xs leading-6 text-white">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </div>
      ) : null}
    </div>
  );
}

function ResultList({ title, values }: { title: string; values: string[] }) {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-3">
      <p className="text-sm font-medium text-neutral-950">{title}</p>
      <ul className="mt-2 grid gap-1 text-sm leading-6 text-neutral-700">
        {values.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

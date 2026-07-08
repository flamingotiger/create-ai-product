import { generateObject } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/ai/provider";

export const runtime = "nodejs";

const ideaSchema = z.object({
  title: z.string().describe("A short product title."),
  summary: z.string().describe("A concise summary of the product idea."),
  targetUsers: z
    .array(z.string())
    .describe("The main user segments this product should serve."),
  coreFeatures: z
    .array(z.string())
    .describe("The core features needed for an initial product."),
  difficulty: z
    .enum(["low", "medium", "high"])
    .describe("The estimated implementation difficulty."),
  monetizationIdeas: z
    .array(z.string())
    .describe("Practical ways this product could make money.")
});

export async function POST(request: Request) {
  try {
    const { idea } = (await request.json()) as { idea?: string };

    if (!idea?.trim()) {
      return Response.json({ error: "Idea is required." }, { status: 400 });
    }

    const model = getModel();

    const result = await generateObject({
      model,
      schema: ideaSchema,
      prompt: `Analyze this service idea as an early AI product concept.

Service idea:
${idea}

Return a practical, concise product analysis for a founder who wants to build a v0.1 quickly.`
    });

    return Response.json(result.object);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to generate structured output.";

    return Response.json({ error: message }, { status: 500 });
  }
}

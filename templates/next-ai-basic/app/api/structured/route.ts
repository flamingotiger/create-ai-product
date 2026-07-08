import { generateObject } from "ai";
import { z } from "zod";
import { getModel } from "@/lib/ai/provider";

export const runtime = "nodejs";

const ideaSchema = z.object({
  name: z.string().describe("A short product name."),
  audience: z.string().describe("The primary user or customer."),
  valueProposition: z.string().describe("The main value in one sentence."),
  firstFeature: z.string().describe("The first feature to build.")
});

export async function POST(request: Request) {
  const { idea } = (await request.json()) as { idea?: string };

  if (!idea?.trim()) {
    return Response.json({ error: "Idea is required." }, { status: 400 });
  }

  const model = getModel();

  const result = await generateObject({
    model,
    schema: ideaSchema,
    prompt: `Turn this raw AI product idea into a compact starter brief: ${idea}`
  });

  return Response.json(result.object);
}

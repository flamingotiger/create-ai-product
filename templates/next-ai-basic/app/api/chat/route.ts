import { generateText } from "ai";
import { getModel } from "@/lib/ai/provider";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { message } = (await request.json()) as { message?: string };

  if (!message?.trim()) {
    return Response.json({ error: "Message is required." }, { status: 400 });
  }

  const model = getModel();

  const result = await generateText({
    model,
    system:
      "You are a concise product copilot helping a founder shape an AI product.",
    prompt: message
  });

  return Response.json({ text: result.text });
}

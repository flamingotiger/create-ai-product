import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage
} from "ai";
import { getModel } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as {
      messages?: UIMessage[];
    };

    if (!Array.isArray(messages)) {
      return Response.json({ error: "Messages are required." }, { status: 400 });
    }

    const model = getModel();

    const result = streamText({
      model,
      instructions:
        "You are a concise product copilot helping a founder shape an AI product.",
      messages: await convertToModelMessages(messages)
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError: (error) => {
          if (error instanceof Error) {
            return error.message;
          }

          return "An error occurred while streaming the response.";
        }
      })
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create chat stream.";

    return Response.json({ error: message }, { status: 500 });
  }
}

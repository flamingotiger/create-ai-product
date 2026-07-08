import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { env } from "@/lib/env";
import { DEFAULT_GEMINI_MODEL, DEFAULT_OPENAI_MODEL } from "./models";

export function getLanguageModel() {
  if (env.AI_PROVIDER === "gemini") {
    return google(DEFAULT_GEMINI_MODEL);
  }

  return openai(DEFAULT_OPENAI_MODEL);
}

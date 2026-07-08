import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { getEnv } from "@/lib/env";

export function getModel() {
  const env = getEnv();

  if (env.AI_PROVIDER === "openai") {
    return createOpenAI({
      apiKey: env.OPENAI_API_KEY
    })(env.OPENAI_MODEL);
  }

  if (env.AI_PROVIDER === "gemini") {
    return createGoogleGenerativeAI({
      apiKey: env.GEMINI_API_KEY
    })(env.GEMINI_MODEL);
  }

  const exhaustiveCheck: never = env.AI_PROVIDER;
  return exhaustiveCheck;
}

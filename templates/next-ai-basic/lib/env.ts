const providers = ["openai", "gemini"] as const;

type AiProvider = (typeof providers)[number];

function getProvider(value: string | undefined): AiProvider {
  if (value === "gemini") {
    return value;
  }

  return "openai";
}

export const env = {
  AI_PROVIDER: getProvider(process.env.AI_PROVIDER),
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY
};

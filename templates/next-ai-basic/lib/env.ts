import { DEFAULT_GEMINI_MODEL, DEFAULT_OPENAI_MODEL } from "@/lib/ai/models";

export const AI_PROVIDERS = ["openai", "gemini"] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];

type BaseEnv = {
  OPENAI_API_KEY?: string;
  GEMINI_API_KEY?: string;
  OPENAI_MODEL: string;
  GEMINI_MODEL: string;
};

export type OpenAIEnv = BaseEnv & {
  AI_PROVIDER: "openai";
  OPENAI_API_KEY: string;
};

export type GeminiEnv = BaseEnv & {
  AI_PROVIDER: "gemini";
  GEMINI_API_KEY: string;
};

export type Env = OpenAIEnv | GeminiEnv;

function readRequiredProvider(value: string | undefined): AiProvider {
  if (value === "openai" || value === "gemini") {
    return value;
  }

  throw new Error(
    `Invalid AI_PROVIDER "${value ?? ""}". Expected "openai" or "gemini".`
  );
}

function readOptional(value: string | undefined) {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

function readModel(value: string | undefined, fallback: string) {
  return readOptional(value) ?? fallback;
}

export function getEnv(): Env {
  const baseEnv = {
    OPENAI_API_KEY: readOptional(process.env.OPENAI_API_KEY),
    GEMINI_API_KEY: readOptional(process.env.GEMINI_API_KEY),
    OPENAI_MODEL: readModel(process.env.OPENAI_MODEL, DEFAULT_OPENAI_MODEL),
    GEMINI_MODEL: readModel(process.env.GEMINI_MODEL, DEFAULT_GEMINI_MODEL)
  };

  const provider = readRequiredProvider(process.env.AI_PROVIDER);

  if (provider === "openai") {
    if (!baseEnv.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY for AI_PROVIDER=openai.");
    }

    return {
      ...baseEnv,
      AI_PROVIDER: provider,
      OPENAI_API_KEY: baseEnv.OPENAI_API_KEY
    };
  }

  if (!baseEnv.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY for AI_PROVIDER=gemini.");
  }

  return {
    ...baseEnv,
    AI_PROVIDER: provider,
    GEMINI_API_KEY: baseEnv.GEMINI_API_KEY
  };
}

import path from "node:path";
import fs from "fs-extra";

export type AiProvider = "openai" | "gemini";

type CopyTemplateOptions = {
  projectName: string;
  provider: AiProvider;
  targetDir: string;
  templateDir: string;
};

const providerConfig = {
  openai: {
    label: "OpenAI",
    apiKeyName: "OPENAI_API_KEY",
    modelEnvName: "OPENAI_MODEL",
    modelName: "gpt-4o-mini"
  },
  gemini: {
    label: "Gemini",
    apiKeyName: "GEMINI_API_KEY",
    modelEnvName: "GEMINI_MODEL",
    modelName: "gemini-1.5-flash"
  }
} satisfies Record<
  AiProvider,
  {
    label: string;
    apiKeyName: string;
    modelEnvName: string;
    modelName: string;
  }
>;

const placeholderFiles = [".env.example", "README.md", "lib/ai/models.ts"];

export async function copyTemplate({
  projectName,
  provider,
  targetDir,
  templateDir
}: CopyTemplateOptions) {
  await fs.copy(templateDir, targetDir);
  await updatePackageName(targetDir, projectName);
  await replacePlaceholders(targetDir, provider);
}

async function updatePackageName(targetDir: string, projectName: string) {
  const packageJsonPath = path.join(targetDir, "package.json");

  if (!(await fs.pathExists(packageJsonPath))) {
    return;
  }

  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = projectName;
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
}

async function replacePlaceholders(targetDir: string, provider: AiProvider) {
  const config = providerConfig[provider];
  const replacements = {
    __AI_PROVIDER__: provider,
    __PROVIDER_LABEL__: config.label,
    __API_KEY_NAME__: config.apiKeyName,
    __MODEL_ENV_NAME__: config.modelEnvName,
    __MODEL_NAME__: config.modelName
  };

  for (const file of placeholderFiles) {
    const filePath = path.join(targetDir, file);

    if (!(await fs.pathExists(filePath))) {
      continue;
    }

    let contents = await fs.readFile(filePath, "utf8");

    for (const [placeholder, value] of Object.entries(replacements)) {
      contents = contents.replaceAll(placeholder, value);
    }

    await fs.writeFile(filePath, contents);
  }
}

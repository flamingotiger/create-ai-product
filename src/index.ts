#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { Command } from "commander";
import fs from "fs-extra";
import prompts from "prompts";
import { copyTemplate, type AiProvider } from "./copy-template.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const templateDir = path.join(packageRoot, "templates", "next-ai-basic");

const program = new Command();

program
  .name("create-ai-product")
  .description("Create a minimal Next.js AI starter project.")
  .version("0.1.0")
  .argument("<project-name>", "name of the project folder to create")
  .action(async (projectName: string) => {
    await createProject(projectName);
  });

program.parseAsync(process.argv).catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(chalk.red(`Error: ${message}`));
  process.exit(1);
});

async function createProject(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName);

  if (await fs.pathExists(targetDir)) {
    console.error(chalk.red(`Error: target directory already exists: ${targetDir}`));
    process.exit(1);
  }

  const response = await prompts(
    {
      type: "select",
      name: "provider",
      message: "Choose an AI provider",
      choices: [
        { title: "OpenAI", value: "openai" },
        { title: "Gemini", value: "gemini" }
      ],
      initial: 0
    },
    {
      onCancel: () => {
        console.log(chalk.yellow("Project creation cancelled."));
        process.exit(0);
      }
    }
  );

  const provider = response.provider as AiProvider | undefined;

  if (!provider) {
    console.log(chalk.yellow("Project creation cancelled."));
    process.exit(0);
  }

  await copyTemplate({
    projectName,
    provider,
    targetDir,
    templateDir
  });

  console.log();
  console.log(chalk.green(`Created ${projectName} successfully.`));
  console.log();
  console.log(chalk.cyan("Next steps:"));
  console.log(`  cd ${projectName}`);
  console.log("  npm install");
  console.log("  cp .env.example .env.local");
  console.log("  npm run dev");
}

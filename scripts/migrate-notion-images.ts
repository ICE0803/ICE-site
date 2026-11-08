import { resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { migrateNotionImages, type MigrationBlock, type MigrationPage } from "../src/lib/notion-image-migration.ts"
import { isDirectRun, loadEnvironment, registerAliasHooks, safeDiagnostic } from "./notion-image-cli-utils.ts"

export async function runMigrationCli(args = process.argv.slice(2), root = process.cwd()): Promise<number> {
  const allowed = new Set(["--dry-run", "--check"])
  if (args.some((arg) => !allowed.has(arg)) || args.includes("--dry-run") && args.includes("--check")) {
    console.error("Usage: node --experimental-strip-types scripts/migrate-notion-images.ts [--dry-run|--check]")
    return 2
  }
  try {
    registerAliasHooks(root)
    await loadEnvironment(root)
    const api = await import(pathToFileURL(resolve(root, "src/lib/notion.ts")).href) as unknown as {
      getNotionMigrationPages: () => Promise<MigrationPage[]>
      getNotionPageBlocks: (pageId: string) => Promise<MigrationBlock[]>
    }
    const result = await migrateNotionImages({
      root,
      dryRun: args.includes("--dry-run"),
      check: args.includes("--check"),
      getPages: api.getNotionMigrationPages,
      getBlocks: api.getNotionPageBlocks,
    })
    for (const item of result.issues) console.error(safeDiagnostic(`${item.title} (${item.slug}) ${item.blockId}: ${item.reason}`))
    console.log(`Checked ${result.checked} images; downloaded ${result.downloaded}; failures ${result.issues.length}.`)
    return result.issues.length ? 1 : 0
  } catch (error) {
    console.error(`Notion image migration failed: ${error instanceof Error ? safeDiagnostic(error.message) : "unknown error"}`)
    return 1
  }
}
if (isDirectRun(import.meta.url)) process.exitCode = await runMigrationCli(process.argv.slice(2), resolve(process.cwd()))

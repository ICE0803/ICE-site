import { resolve } from "node:path"
import { verifyLocalImages } from "../src/lib/notion-image-migration.ts"
import { isDirectRun, safeDiagnostic } from "./notion-image-cli-utils.ts"

export async function runVerifyCli(root = process.cwd()): Promise<number> {
  try {
    const result = await verifyLocalImages(root)
    for (const item of result.issues) console.error(safeDiagnostic(`${item.title} (${item.slug}) ${item.blockId}: ${item.reason}`))
    console.log(`Verified ${result.checked} mapped images; failures ${result.issues.length}.`)
    return result.issues.length ? 1 : 0
  } catch (error) {
    console.error(`Local image verification failed: ${error instanceof Error ? safeDiagnostic(error.message) : "unknown error"}`)
    return 1
  }
}
if (isDirectRun(import.meta.url)) process.exitCode = await runVerifyCli(resolve(process.cwd()))

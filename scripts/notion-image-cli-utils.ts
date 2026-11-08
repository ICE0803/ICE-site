import * as nodeModule from "node:module"
import { fileURLToPath, pathToFileURL } from "node:url"
import { extname, resolve } from "node:path"

// The project uses @types/node 20; registerHooks requires Node >=22.15.
type ResolveNext = (specifier: string, context: object) => { url: string; [key: string]: unknown }
type Hooks = { resolve: (specifier: string, context: object, nextResolve: ResolveNext) => ReturnType<ResolveNext> }
export function registerAliasHooks(root: string): void {
  const { registerHooks } = nodeModule as unknown as { registerHooks: (hooks: Hooks) => unknown }
  if (!registerHooks) throw new Error("Node >=22.15 is required")
  const src = resolve(root, "src")
  registerHooks({
    resolve(specifier, context, nextResolve) {
      if (!specifier.startsWith("@/")) return nextResolve(specifier, context)
      // JSON and other explicit extensions must remain unchanged.
      const path = specifier.slice(2)
      return nextResolve(pathToFileURL(resolve(src, extname(path) ? path : `${path}.ts`)).href, context)
    },
  })
}
export function isDirectRun(metaUrl: string): boolean {
  return Boolean(process.argv[1]) && resolve(fileURLToPath(metaUrl)) === resolve(process.argv[1])
}
export function safeDiagnostic(value: string): string {
  const secrets = Object.entries(process.env).filter(([key, val]) => /token|secret|password|credential|api.?key/i.test(key) && val).map(([, val]) => val!)
  let result = value
  for (const secret of secrets) result = result.split(secret).join("[redacted]")
  return result.replace(/https?:\/\/[^\s"'<>]+/gi, "[URL redacted]").replace(/[\r\n\x00-\x1f\x7f]/g, " ")
}
export async function loadEnvironment(root: string): Promise<void> {
  const { createRequire } = await import("node:module")
  const { loadEnvConfig } = createRequire(import.meta.url)("@next/env") as typeof import("@next/env")
  loadEnvConfig(root)
}

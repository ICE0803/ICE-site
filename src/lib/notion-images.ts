import COS from "cos-nodejs-sdk-v5"

const imageExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
}

export type NotionImageUpload = {
  body: ArrayBuffer
  contentType: string
  blockId: string
}

export type NotionImageUploader = (input: NotionImageUpload & { key: string; config: CosConfig }) => Promise<void>
type CosConfig = {
  secretId: string
  secretKey: string
  bucket: string
  region: string
  publicBaseUrl: string
}

type UploadObject = (input: NotionImageUpload & { key: string; config: CosConfig }) => Promise<void>

export class NotionImageConfigError extends Error {}
export class NotionImageUploadError extends Error {}

function config(): CosConfig {
  const values = {
    secretId: process.env.COS_SECRET_ID,
    secretKey: process.env.COS_SECRET_KEY,
    bucket: process.env.COS_BUCKET,
    region: process.env.COS_REGION,
    publicBaseUrl: process.env.COS_PUBLIC_BASE_URL,
  }
  if (Object.values(values).some((value) => !value?.trim())) {
    throw new NotionImageConfigError("COS image storage is not configured")
  }
  return {
    secretId: values.secretId!.trim(),
    secretKey: values.secretKey!.trim(),
    bucket: values.bucket!.trim(),
    region: values.region!.trim(),
    publicBaseUrl: values.publicBaseUrl!.trim().replace(/\/+$/, ""),
  }
}

function extension(contentType: string): string {
  const value = imageExtensions[contentType.toLowerCase()]
  if (!value) throw new NotionImageUploadError("Unsupported image type")
  return value
}

export function notionImageKey(blockId: string, contentType: string): string {
  return `notion-images/${blockId}.${extension(contentType)}`
}

export function notionImagePublicUrl(blockId: string, contentType: string): string {
  const settings = config()
  return `${settings.publicBaseUrl}/${notionImageKey(blockId, contentType)}`
}

function sdkUploader(input: NotionImageUpload & { key: string; config: CosConfig }): Promise<void> {
  const client = new COS({ SecretId: input.config.secretId, SecretKey: input.config.secretKey })
  return client.putObject({
    Bucket: input.config.bucket,
    Region: input.config.region,
    Key: input.key,
    Body: Buffer.from(input.body),
    ContentLength: input.body.byteLength,
    ContentType: input.contentType,
    CacheControl: "public, max-age=31536000, immutable",
  }).then(() => undefined)
}

let uploader: UploadObject = sdkUploader
const pending = new Map<string, Promise<string>>()

export function setNotionImageUploaderForTests(next: UploadObject | undefined): void {
  uploader = next ?? sdkUploader
  pending.clear()
}

export async function syncNotionImage(input: NotionImageUpload): Promise<string> {
  const settings = config()
  const contentType = input.contentType.toLowerCase()
  const key = notionImageKey(input.blockId, contentType)
  const existing = pending.get(key)
  if (existing) return existing

  const operation = uploader({ ...input, contentType, key, config: settings })
    .then(() => `${settings.publicBaseUrl}/${key}`)
    .catch((error) => {
      throw error instanceof NotionImageConfigError || error instanceof NotionImageUploadError
        ? error
        : new NotionImageUploadError("COS image upload failed")
    })
    .finally(() => pending.delete(key))
  pending.set(key, operation)
  return operation
}

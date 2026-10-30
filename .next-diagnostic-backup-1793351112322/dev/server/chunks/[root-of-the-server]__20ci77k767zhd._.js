module.exports = [
(()=>{"use strict";return[
"[project]/src/app/api/notion/images/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notion$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notion.ts [app-route] (ecmascript)");
;
const imageTypes = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/avif"
]);
const maxImageBytes = 10 * 1024 * 1024;
const blockIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const defaultAllowedHosts = [
    "prod-files-secure.s3.us-west-2.amazonaws.com",
    "prod-files-secure.s3.amazonaws.com"
];
function allowedHosts() {
    const configured = process.env.NOTION_FILE_HOSTS?.split(",").map((host)=>host.trim().toLowerCase()).filter(Boolean);
    return new Set(configured?.length ? configured : defaultAllowedHosts);
}
function validSource(value) {
    try {
        const url = new URL(value);
        if (url.protocol !== "https:" || url.username || url.password || !allowedHosts().has(url.hostname.toLowerCase())) return undefined;
        return url;
    } catch  {
        return undefined;
    }
}
async function readLimitedBody(response) {
    if (!response.body) return {
        error: "read-failed"
    };
    const reader = response.body.getReader();
    const chunks = [];
    let total = 0;
    try {
        while(true){
            const { done, value } = await reader.read();
            if (done) break;
            total += value.byteLength;
            if (total > maxImageBytes) {
                await reader.cancel();
                return {
                    error: "too-large"
                };
            }
            chunks.push(value);
        }
    } catch  {
        await reader.cancel().catch(()=>undefined);
        return {
            error: "read-failed"
        };
    } finally{
        reader.releaseLock();
    }
    const body = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks){
        body.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return {
        body: body.buffer
    };
}
function failure(status) {
    return new Response(null, {
        status,
        headers: {
            "Cache-Control": "no-store",
            "X-Content-Type-Options": "nosniff"
        }
    });
}
async function GET(_request, { params }) {
    const { id } = await params;
    if (!blockIdPattern.test(id)) return failure(400);
    try {
        const block = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notion$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNotionImageBlock"])(id);
        if (!block) return failure(404);
        if (block.type !== "image") return failure(422);
        const image = block.image;
        if (image?.type !== "file") return failure(422);
        const source = typeof image.file?.url === "string" ? validSource(image.file.url) : undefined;
        if (!source) return failure(502);
        const upstream = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notion$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["downloadNotionImage"])(source.toString());
        if (upstream.status >= 300 && upstream.status < 400) return failure(502);
        if (!upstream.ok) return failure(502);
        const contentType = upstream.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase() ?? "";
        if (!imageTypes.has(contentType)) return failure(415);
        const lengthHeader = upstream.headers.get("content-length");
        const declaredLength = lengthHeader === null ? undefined : Number(lengthHeader);
        if (declaredLength !== undefined && Number.isFinite(declaredLength) && declaredLength > maxImageBytes) {
            await upstream.body?.cancel();
            return failure(413);
        }
        const { body, error } = await readLimitedBody(upstream);
        if (error === "too-large") return failure(413);
        if (error || !body) return failure(502);
        return new Response(body, {
            headers: {
                "Content-Type": contentType,
                "Content-Length": String(body.byteLength),
                "Cache-Control": "private, no-store, max-age=0",
                "X-Content-Type-Options": "nosniff",
                "Content-Security-Policy": "default-src 'none'; sandbox",
                "Referrer-Policy": "no-referrer"
            }
        });
    } catch (error) {
        const timedOut = error instanceof Error && (error.name === "TimeoutError" || error.name === "AbortError");
        console.error("Notion image proxy failed", {
            blockId: id,
            reason: timedOut ? "timeout" : "upstream failure"
        });
        return failure(timedOut ? 504 : 502);
    }
}
}),
"[project]/src/lib/notion-blocks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notionBlocksToMarkdown",
    ()=>notionBlocksToMarkdown
]);
function escapeText(value) {
    return value.replace(/\\/g, "\\\\").replace(/([{}<>\[\]*_!~|])/g, "\\$1").replace(/(^|\n)([ \t]*)(#{1,6}(?=\s)|>|(?:[-+]|\d+\.)(?=\s))/g, (_match, start, spaces, marker)=>`${start}${spaces}\\${marker}`);
}
function safeUrl(value) {
    if (!value) return undefined;
    try {
        const url = new URL(value);
        return url.protocol === "https:" || url.protocol === "http:" ? url.toString().replace(/[()]/g, (char)=>char === "(" ? "%28" : "%29") : undefined;
    } catch  {
        return undefined;
    }
}
function text(value = []) {
    return value.map((item)=>{
        const raw = item.plain_text ?? "";
        let result = escapeText(raw).replace(/`/g, "\\`");
        const annotations = item.annotations;
        if (annotations?.code) {
            const fence = "`".repeat(Math.max(1, ...(raw.match(/`+/g) ?? []).map((run)=>run.length + 1)));
            result = `${fence}${raw.includes("`") ? ` ${raw} ` : raw}${fence}`;
        } else {
            if (annotations?.bold) result = `**${result}**`;
            if (annotations?.italic) result = `*${result}*`;
            if (annotations?.strikethrough) result = `~~${result}~~`;
        }
        const href = safeUrl(item.href);
        return href ? `[${result}](${href})` : result;
    }).join("");
}
function richText(block) {
    return block[block.type]?.rich_text ?? [];
}
function imageUrl(block) {
    const image = block.image;
    if (!image || typeof image !== "object") return undefined;
    if (image.type === "external") return safeUrl(image.external?.url);
    if (image.type === "file") {
        const id = block.id ?? "";
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id) ? `/api/notion/images/${id}` : undefined;
    }
    return undefined;
}
function imageAlt(block) {
    const image = block.image;
    const raw = text(image?.caption ?? []);
    return raw.replace(/\\([{}<>\[\]*_!~|])/g, "$1").replace(/`/g, "");
}
function render(blocks, depth = 0) {
    const fragments = [];
    let list = [];
    let listType = "";
    const flush = ()=>{
        if (list.length) fragments.push(list.join("\n"));
        list = [];
        listType = "";
    };
    for (const block of blocks){
        const content = text(richText(block));
        const indent = "  ".repeat(depth);
        if ([
            "bulleted_list_item",
            "numbered_list_item",
            "to_do"
        ].includes(block.type)) {
            if (listType && listType !== block.type) flush();
            listType = block.type;
            const checked = block.to_do?.checked;
            const marker = block.type === "bulleted_list_item" ? "-" : block.type === "numbered_list_item" ? `${list.length + 1}.` : `- [${checked ? "x" : " "}]`;
            const children = block.children?.length ? `\n${render(block.children, depth + 1).replace(/\n\n/g, "\n")}` : "";
            list.push(`${indent}${marker} ${content}${children}`);
            continue;
        }
        flush();
        let result = "";
        switch(block.type){
            case "paragraph":
                result = content;
                break;
            case "heading_1":
                result = `# ${content}`;
                break;
            case "heading_2":
                result = `## ${content}`;
                break;
            case "heading_3":
                result = `### ${content}`;
                break;
            case "quote":
            case "callout":
                result = content.split("\n").map((line)=>`> ${line}`).join("\n");
                break;
            case "code":
                {
                    const value = block.code;
                    const source = (value?.rich_text ?? []).map((part)=>part.plain_text ?? "").join("");
                    const fence = "`".repeat(Math.max(3, ...(source.match(/`+/g) ?? []).map((run)=>run.length + 1)));
                    const language = /^[a-zA-Z0-9_+.-]+$/.test(value?.language ?? "") ? value?.language : "text";
                    result = `${fence}${language}\n${source}\n${fence}`;
                    break;
                }
            case "equation":
                {
                    const expression = block.equation?.expression;
                    if (expression) result = `$$\n${expression.replace(/[{}<>]/g, (char)=>`\\${char}`)}\n$$`;
                    break;
                }
            case "image":
                {
                    const image = imageUrl(block);
                    if (image) {
                        const alt = imageAlt(block);
                        result = `![${alt}](${image})`;
                    }
                    break;
                }
            case "divider":
                result = "---";
                break;
            case "bookmark":
            case "link_preview":
                {
                    const url = safeUrl(block[block.type]?.url);
                    if (url) result = `[${url}](${url})`;
                    break;
                }
            case "table":
                {
                    const rows = (block.children ?? []).filter((child)=>child.type === "table_row").map((row)=>(row.table_row?.cells ?? []).map((cell)=>text(cell).replace(/\|/g, "\\|")));
                    if (rows.length) result = rows.map((row, index)=>`| ${row.join(" | ")} |${index === 0 ? `\n| ${row.map(()=>"---").join(" | ")} |` : ""}`).join("\n");
                    break;
                }
        }
        if (result) fragments.push(result.split("\n").map((line)=>`${indent}${line}`).join("\n"));
        if (block.children?.length && block.type !== "table") fragments.push(render(block.children, depth + 1));
    }
    flush();
    return fragments.filter(Boolean).join("\n\n");
}
function notionBlocksToMarkdown(blocks) {
    return render(blocks).trim();
}
}),
"[project]/src/lib/notion.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadNotionImage",
    ()=>downloadNotionImage,
    "findPublishedNotionEntry",
    ()=>findPublishedNotionEntry,
    "getNotionImageBlock",
    ()=>getNotionImageBlock,
    "getNotionPost",
    ()=>getNotionPost,
    "getNotionPosts",
    ()=>getNotionPosts,
    "hasNotionPost",
    ()=>hasNotionPost,
    "indexNotionPages",
    ()=>indexNotionPages,
    "isNotionConfigured",
    ()=>isNotionConfigured,
    "parsePage",
    ()=>parsePage,
    "publishedNotionPosts",
    ()=>publishedNotionPosts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .object>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .string>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .enum>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .boolean>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .array>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$ZodError$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z .ZodError>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notion$2d$blocks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/notion-blocks.ts [app-route] (ecmascript)");
;
;
;
;
const notionApi = "https://api.notion.com/v1";
const apiVersion = process.env.NOTION_API_VERSION ?? "2022-06-28";
const contentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$object$3e$__["z"].object({
    pageId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().uuid(),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    date: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updatedAt: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().min(1),
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$enum$3e$__["z"].enum([
        "blog",
        "note"
    ]),
    published: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$boolean$3e$__["z"].boolean(),
    tags: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$array$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string()).optional(),
    cover: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$string$3e$__["z"].string().url().refine((url)=>/^https?:\/\//.test(url)).optional()
});
const notionEnabled = Boolean(process.env.NOTION_TOKEN && process.env.NOTION_DATABASE_ID);
const fields = {
    title: "名称",
    slug: "Slug",
    description: "摘要",
    category: "分类",
    contentType: "类型",
    status: "状态",
    date: "发布时间",
    updatedAt: "Updated At",
    tags: "Tags"
};
function property(page, name) {
    return page.properties?.[name];
}
function richTextValue(value) {
    if (!Array.isArray(value)) return "";
    return value.map((part)=>part.plain_text ?? "").join("").trim();
}
function selectValue(value) {
    if (!value || typeof value !== "object") return "";
    return (value.name ?? "").trim();
}
function propertyText(page, name) {
    const item = property(page, name);
    if (!item) return "";
    if (item.type === "title") return richTextValue(item.title);
    if (item.type === "rich_text") return richTextValue(item.rich_text);
    if (item.type === "select") return selectValue(item.select);
    if (item.type === "status") return selectValue(item.status);
    return "";
}
function propertyDate(page, name) {
    const item = property(page, name);
    if (item?.type !== "date") return undefined;
    const value = item.date;
    return value?.start?.slice(0, 10);
}
function pageCover(page) {
    const cover = page.cover;
    return cover?.type === "external" && /^https?:\/\//.test(cover.external?.url ?? "") ? cover.external?.url : undefined;
}
function contentStatus(value) {
    if ([
        "published",
        "已发布",
        "完成"
    ].includes(value)) return {
        published: true,
        valid: true
    };
    if ([
        "draft",
        "草稿",
        "未开始",
        "archived",
        "已归档"
    ].includes(value)) return {
        published: false,
        valid: true
    };
    return {
        published: false,
        valid: false
    };
}
function parsePage(page) {
    const statusValue = propertyText(page, fields.status).toLowerCase();
    const status = contentStatus(statusValue);
    if (!status.valid) throw new Error(`Invalid property "${fields.status}": unsupported status value`);
    const rawType = propertyText(page, fields.contentType).toLowerCase();
    const contentType = rawType === "博客" ? "blog" : rawType === "笔记" ? "note" : rawType;
    const rawTags = property(page, fields.tags)?.multi_select;
    return contentSchema.parse({
        pageId: page.id,
        slug: propertyText(page, fields.slug),
        title: propertyText(page, fields.title),
        description: propertyText(page, fields.description),
        date: propertyDate(page, fields.date),
        updatedAt: propertyDate(page, fields.updatedAt),
        category: propertyText(page, fields.category),
        contentType,
        published: status.published,
        tags: rawTags?.map((tag)=>tag.name ?? "").filter(Boolean),
        cover: pageCover(page)
    });
}
async function notionFetch(path, init) {
    const token = process.env.NOTION_TOKEN;
    if (!token) throw new Error("Notion integration is not configured");
    let lastError;
    for(let attempt = 0; attempt < 3; attempt += 1){
        try {
            const response = await fetch(`${notionApi}${path}`, {
                ...init,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Notion-Version": apiVersion,
                    "Content-Type": "application/json",
                    ...init?.headers
                },
                signal: AbortSignal.timeout(10_000),
                ...init?.cache === "no-store" ? {} : {
                    next: {
                        revalidate: 300,
                        tags: [
                            "posts"
                        ]
                    }
                }
            });
            if (response.ok) return await response.json();
            if (response.status !== 429 && response.status < 500) {
                throw new Error(`Notion API returned ${response.status}`);
            }
            lastError = new Error(`Notion API returned ${response.status}`);
        } catch (error) {
            if (error instanceof Error && /^Notion API returned 4\d\d$/.test(error.message) && error.message !== "Notion API returned 429") throw error;
            lastError = error;
        }
        if (attempt < 2) await new Promise((resolve)=>setTimeout(resolve, 250 * 2 ** attempt));
    }
    throw lastError instanceof Error ? lastError : new Error("Notion API request failed");
}
async function paginated(path, method) {
    const result = [];
    let cursor;
    do {
        const options = {
            page_size: 100,
            ...cursor ? {
                start_cursor: cursor
            } : {}
        };
        const response = method === "POST" ? await notionFetch(path, {
            method,
            body: JSON.stringify(options)
        }) : await notionFetch(`${path}?${new URLSearchParams(Object.entries(options).map(([key, value])=>[
                key,
                String(value)
            ]))}`);
        result.push(...response.results);
        cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
    }while (cursor)
    return result;
}
function indexNotionPages(pages) {
    const entries = pages.flatMap((page)=>{
        const slug = propertyText(page, fields.slug);
        const status = contentStatus(propertyText(page, fields.status).toLowerCase());
        if (status.valid && !status.published) {
            return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? [
                {
                    pageId: page.id,
                    slug
                }
            ] : [];
        }
        try {
            return [
                {
                    pageId: page.id,
                    slug,
                    post: parsePage(page)
                }
            ];
        } catch (error) {
            const reason = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z__$2e$ZodError$3e$__["z"].ZodError ? error.issues.map((issue)=>`${issue.path.join(".")}: ${issue.code}`).join(", ") : error instanceof Error ? error.message : "unknown error";
            console.error("Notion page parse failed", {
                pageId: page.id,
                stage: "properties",
                reason
            });
            return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? [
                {
                    pageId: page.id,
                    slug
                }
            ] : [];
        }
    });
    return entries.sort((a, b)=>(b.post?.date ?? "").localeCompare(a.post?.date ?? ""));
}
const getNotionIndex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const pages = await paginated(`/databases/${process.env.NOTION_DATABASE_ID}/query`, "POST");
    return indexNotionPages(pages);
});
async function getBlockChildren(blockId) {
    return paginated(`/blocks/${blockId}/children`, "GET");
}
async function expandBlocks(blocks, depth = 0) {
    if (depth > 12) throw new Error("Notion block nesting limit exceeded");
    return Promise.all(blocks.map(async (block)=>{
        if (!block.has_children) return block;
        const children = await getBlockChildren(block.id);
        return {
            ...block,
            children: await expandBlocks(children, depth + 1)
        };
    }));
}
function isNotionConfigured() {
    return notionEnabled;
}
function publishedNotionPosts(entries) {
    return entries.flatMap((entry)=>{
        if (!entry.post?.published) return [];
        const { pageId, ...post } = entry.post;
        void pageId;
        return [
            post
        ];
    });
}
async function getNotionPosts() {
    return publishedNotionPosts(await getNotionIndex());
}
async function hasNotionPost(slug) {
    return (await getNotionIndex()).some((entry)=>entry.slug === slug);
}
function findPublishedNotionEntry(entries, slug) {
    const matches = entries.filter((entry)=>entry.slug === slug);
    if (matches.length !== 1) return undefined;
    return matches[0].post?.published ? matches[0].post : undefined;
}
async function getNotionImageBlock(blockId) {
    if (!notionEnabled) return undefined;
    try {
        return await notionFetch(`/blocks/${blockId}`, {
            cache: "no-store"
        });
    } catch (error) {
        if (error instanceof Error && error.message === "Notion API returned 404") return undefined;
        throw error;
    }
}
async function downloadNotionImage(url) {
    return fetch(url, {
        redirect: "error",
        signal: AbortSignal.timeout(10_000),
        cache: "no-store"
    });
}
async function getNotionPost(slug) {
    const post = findPublishedNotionEntry(await getNotionIndex(), slug);
    if (!post) return undefined;
    let content = "";
    try {
        const blocks = await getBlockChildren(post.pageId);
        const expandedBlocks = await expandBlocks(blocks);
        content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$notion$2d$blocks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["notionBlocksToMarkdown"])(expandedBlocks);
    } catch (error) {
        console.error("Notion post content unavailable", error instanceof Error ? error.message : "unknown error");
    }
    const { pageId, ...publicPost } = post;
    void pageId;
    return {
        post: {
            ...publicPost,
            readingTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readingTime"])(content)
        },
        content
    };
}
}),
"[project]/src/lib/utils.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate,
    "readingTime",
    ()=>readingTime
]);
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
});
function formatDate(date) {
    return dateFormatter.format(new Date(date));
}
function readingTime(content) {
    const chinese = content.match(/[一-鿿]/g)?.length ?? 0;
    const words = content.replace(/[一-鿿]/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil((chinese + words) / 300));
}
}),
]})(),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__20ci77k767zhd._.js.map
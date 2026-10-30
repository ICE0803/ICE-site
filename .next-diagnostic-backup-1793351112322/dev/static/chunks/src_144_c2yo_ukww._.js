(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/interests/interest-archive.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InterestArchive",
    ()=>InterestArchive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.mjs [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.mjs [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/interests.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const artistEntries = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["artists"].map((artist)=>({
        id: artist.id,
        category: "artists",
        title: artist.name
    }));
function externalUrl(value) {
    if (!value) return undefined;
    try {
        const url = new URL(value);
        return [
            "https:",
            "http:"
        ].includes(url.protocol) ? url.href : undefined;
    } catch  {
        return undefined;
    }
}
function coverUrl(value) {
    return value?.startsWith("/") && !value.startsWith("//") ? value : externalUrl(value);
}
function InterestArchive() {
    _s();
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("music");
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const openTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const closeTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const removeTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(undefined);
    const items = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "InterestArchive.useMemo[items]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestItems"].filter({
                "InterestArchive.useMemo[items]": (item)=>item.category === category
            }["InterestArchive.useMemo[items]"])
    }["InterestArchive.useMemo[items]"], [
        category
    ]);
    const clearTimers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterestArchive.useCallback[clearTimers]": ()=>{
            clearTimeout(openTimer.current);
            clearTimeout(closeTimer.current);
            clearTimeout(removeTimer.current);
        }
    }["InterestArchive.useCallback[clearTimers]"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "InterestArchive.useCallback[close]": ()=>{
            clearTimers();
            setVisible(false);
            removeTimer.current = setTimeout({
                "InterestArchive.useCallback[close]": ()=>setPreview(null)
            }["InterestArchive.useCallback[close]"], 180);
        }
    }["InterestArchive.useCallback[close]"], [
        clearTimers
    ]);
    const show = (item, anchor, immediate = false)=>{
        clearTimers();
        openTimer.current = setTimeout(()=>{
            setPreview({
                item,
                anchor
            });
            setVisible(true);
        }, immediate ? 0 : 70);
    };
    const leave = ()=>{
        clearTimeout(openTimer.current);
        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(close, 200);
    };
    const keep = ()=>{
        clearTimers();
        setVisible(true);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterestArchive.useEffect": ()=>({
                "InterestArchive.useEffect": ()=>clearTimers()
            })["InterestArchive.useEffect"]
    }["InterestArchive.useEffect"], [
        clearTimers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "InterestArchive.useEffect": ()=>{
            if (!preview) return;
            const keydown = {
                "InterestArchive.useEffect.keydown": (event)=>{
                    if (event.key === "Escape") {
                        if (document.activeElement?.closest(".interest-preview")) preview.anchor.focus();
                        close();
                    }
                }
            }["InterestArchive.useEffect.keydown"];
            const outside = {
                "InterestArchive.useEffect.outside": (event)=>{
                    const target = event.target;
                    if (!preview.anchor.contains(target) && !(target instanceof Element && target.closest(".interest-preview"))) close();
                }
            }["InterestArchive.useEffect.outside"];
            document.addEventListener("keydown", keydown);
            document.addEventListener("pointerdown", outside);
            return ({
                "InterestArchive.useEffect": ()=>{
                    document.removeEventListener("keydown", keydown);
                    document.removeEventListener("pointerdown", outside);
                }
            })["InterestArchive.useEffect"];
        }
    }["InterestArchive.useEffect"], [
        preview,
        close
    ]);
    const selectCategory = (id)=>{
        close();
        setCategory(id);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-reveal": true,
        className: "interest-archive mt-12 sm:mt-16",
        "aria-labelledby": "interest-archive-title",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "interest-header flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[0.62rem] tracking-[0.18em] text-accent",
                                children: "PERSONAL ARCHIVE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "interest-archive-title",
                                className: "mt-2 text-2xl font-semibold tracking-tight",
                                children: "兴趣档案"
                            }, void 0, false, {
                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "interest-category-list flex w-full flex-row flex-nowrap items-center gap-3 overflow-x-auto sm:w-auto",
                        role: "tablist",
                        "aria-label": "兴趣分类",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"].map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: `interest-tab-${item.id}`,
                                type: "button",
                                role: "tab",
                                "aria-selected": category === item.id,
                                "aria-controls": "interest-panel",
                                tabIndex: category === item.id ? 0 : -1,
                                className: "interest-tab w-auto shrink-0 rounded-sm px-3 py-2 text-left text-sm",
                                onClick: ()=>selectCategory(item.id),
                                onKeyDown: (event)=>{
                                    let next = index;
                                    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"].length;
                                    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"].length) % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"].length;
                                    else if (event.key === "Home") next = 0;
                                    else if (event.key === "End") next = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"].length - 1;
                                    else return;
                                    event.preventDefault();
                                    selectCategory(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"][next].id);
                                    document.getElementById(`interest-tab-${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interestCategories"][next].id}`)?.focus();
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: item.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                lineNumber: 106,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mx-auto mt-9 w-full ${category === "artists" ? "max-w-none" : "max-w-[47.5rem]"}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "interest-panel",
                    role: "tabpanel",
                    "aria-labelledby": `interest-tab-${category}`,
                    tabIndex: 0,
                    className: "rounded-sm",
                    children: category === "artists" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "artist-gallery interest-list",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["artists"].map((artist, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArtistPortrait, {
                                    artist: artist,
                                    selected: preview?.item.id === artist.id && visible,
                                    onShow: (anchor)=>show(artistEntries[index], anchor, true),
                                    onLeave: leave
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 139,
                                    columnNumber: 19
                                }, this)
                            }, artist.id, false, {
                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                lineNumber: 138,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "interest-list",
                        children: items.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            children: items.map((item, index)=>{
                                const url = externalUrl(item.url);
                                const selected = preview?.item.id === item.id && visible;
                                const handlers = {
                                    onPointerEnter: (event)=>{
                                        if (event.pointerType === "mouse") show(item, event.currentTarget);
                                    },
                                    onPointerLeave: leave,
                                    onFocus: (event)=>show(item, event.currentTarget),
                                    onBlur: leave
                                };
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "interest-row flex min-h-11 items-center gap-3 py-2 sm:min-h-12 sm:gap-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": true,
                                            className: "w-6 shrink-0 pt-1 font-mono text-xs tabular-nums text-muted-foreground",
                                            children: String(index + 1).padStart(2, "0")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                                            lineNumber: 160,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0 flex-1",
                                            children: url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                ...handlers,
                                                href: url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "interest-title",
                                                "aria-describedby": selected ? "interest-preview-content" : undefined,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            item.title,
                                                            item.creator?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "interest-creator",
                                                                children: [
                                                                    " — ",
                                                                    item.creator
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                                lineNumber: 164,
                                                                columnNumber: 74
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 31
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        "aria-label": "在新标签页打开",
                                                        className: "interest-external-link ml-2 inline h-3.5 w-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                        lineNumber: 165,
                                                        columnNumber: 31
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                lineNumber: 163,
                                                columnNumber: 29
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                ...handlers,
                                                type: "button",
                                                className: "interest-title text-left",
                                                "aria-expanded": selected,
                                                "aria-controls": selected ? "interest-preview-content" : undefined,
                                                onClick: (event)=>show(item, event.currentTarget, true),
                                                children: [
                                                    item.title,
                                                    item.creator?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "interest-creator",
                                                        children: [
                                                            " — ",
                                                            item.creator
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 68
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                lineNumber: 168,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                                            lineNumber: 161,
                                            columnNumber: 25
                                        }, this),
                                        url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-label": `预览${item.title}`,
                                            "aria-expanded": selected,
                                            className: "interest-info rounded-full p-2 text-muted-foreground",
                                            onClick: (event)=>show(item, event.currentTarget, true),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                "aria-hidden": true,
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                                lineNumber: 175,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                                            lineNumber: 174,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 159,
                                    columnNumber: 23
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 146,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "py-6 text-sm text-muted-foreground",
                            children: "这一栏还在慢慢收集。"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 182,
                            columnNumber: 19
                        }, this)
                    }, category, false, {
                        fileName: "[project]/src/components/interests/interest-archive.tsx",
                        lineNumber: 144,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                    lineNumber: 134,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InterestPreview, {
                item: preview.item,
                anchor: preview.anchor,
                visible: visible,
                onEnter: keep,
                onLeave: leave,
                onClose: close
            }, preview.item.id, false, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interests/interest-archive.tsx",
        lineNumber: 98,
        columnNumber: 5
    }, this);
}
_s(InterestArchive, "Ibk3Y9Mq6pYK7r77EHkHLJY1bKo=");
_c = InterestArchive;
function ArtistPortrait({ artist, selected, onShow, onLeave }) {
    _s1();
    const [failed, setFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const image = coverUrl(artist.image);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: "artist-card group w-full text-left",
        "aria-expanded": selected,
        "aria-controls": selected ? "interest-preview-content" : undefined,
        onPointerEnter: (event)=>{
            if (event.pointerType === "mouse") onShow(event.currentTarget);
        },
        onPointerLeave: onLeave,
        onFocus: (event)=>onShow(event.currentTarget),
        onBlur: onLeave,
        onClick: (event)=>onShow(event.currentTarget),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "artist-portrait relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-xl",
                children: image && !failed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                    src: image,
                    alt: `${artist.name}的人物照片`,
                    fill: true,
                    unoptimized: true,
                    sizes: "(max-width: 639px) 45vw, 280px",
                    className: "object-cover",
                    style: {
                        objectPosition: artist.imagePosition ?? "50% 50%"
                    },
                    onError: ()=>setFailed(true)
                }, image, false, {
                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                    lineNumber: 218,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "flex flex-col items-center gap-3 px-4 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "aria-hidden": true,
                            className: "text-3xl font-light tracking-widest text-accent/60",
                            children: artist.name.slice(0, 1)
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 221,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-muted-foreground",
                            children: "等待放入人物照片"
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                    lineNumber: 220,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-4 block text-base font-medium tracking-wide transition-colors group-hover:text-accent group-focus-visible:text-accent",
                children: artist.name
            }, void 0, false, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interests/interest-archive.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_s1(ArtistPortrait, "BFa/7w0IiJnSoWJxZHxuU4kOwF4=");
_c1 = ArtistPortrait;
function InterestPreview({ item, anchor, visible, onEnter, onLeave, onClose }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [failed, setFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cover = coverUrl(item.cover);
    const artist = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$interests$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["artists"].find((entry)=>entry.id === item.id);
    const url = externalUrl(artist?.link ?? item.url);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "InterestPreview.useLayoutEffect": ()=>{
            const update = {
                "InterestPreview.useLayoutEffect.update": ()=>{
                    const card = ref.current;
                    if (!card) return;
                    const viewport = window.visualViewport;
                    const width = viewport?.width ?? window.innerWidth;
                    const height = viewport?.height ?? window.innerHeight;
                    const offsetTop = viewport?.offsetTop ?? 0;
                    const offsetLeft = viewport?.offsetLeft ?? 0;
                    const rect = anchor.getBoundingClientRect();
                    const bounds = card.getBoundingClientRect();
                    const above = rect.top - offsetTop - 12;
                    const below = offsetTop + height - rect.bottom - 12;
                    const top = below >= bounds.height || below >= above ? rect.bottom + 12 : rect.top - bounds.height - 12;
                    setPosition({
                        top: Math.max(offsetTop + 12, Math.min(top, offsetTop + height - bounds.height - 12)),
                        left: Math.max(offsetLeft + 12, Math.min(rect.left, offsetLeft + width - bounds.width - 12))
                    });
                }
            }["InterestPreview.useLayoutEffect.update"];
            update();
            const observer = new ResizeObserver(update);
            if (ref.current) observer.observe(ref.current);
            window.addEventListener("resize", update);
            window.addEventListener("scroll", update, true);
            window.visualViewport?.addEventListener("resize", update);
            window.visualViewport?.addEventListener("scroll", update);
            return ({
                "InterestPreview.useLayoutEffect": ()=>{
                    observer.disconnect();
                    window.removeEventListener("resize", update);
                    window.removeEventListener("scroll", update, true);
                    window.visualViewport?.removeEventListener("resize", update);
                    window.visualViewport?.removeEventListener("scroll", update);
                }
            })["InterestPreview.useLayoutEffect"];
        }
    }["InterestPreview.useLayoutEffect"], [
        anchor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        ref: ref,
        id: "interest-preview-content",
        "aria-label": `${item.title}详情预览`,
        className: `interest-preview ${artist ? "artist-preview" : ""} glass rounded-2xl p-5 backdrop-blur-2xl`,
        "data-visible": visible && position !== null,
        style: {
            top: position?.top ?? 0,
            left: position?.left ?? 0
        },
        onPointerEnter: onEnter,
        onPointerLeave: onLeave,
        onFocus: onEnter,
        onBlur: onLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                "aria-label": "关闭预览",
                onClick: onClose,
                className: "absolute right-2 top-2 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    "aria-hidden": true,
                    className: "h-3.5 w-3.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                    lineNumber: 283,
                    columnNumber: 181
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 283,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-start gap-4",
                children: artist ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-w-0 flex-1 pr-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "break-words text-lg font-semibold leading-snug",
                            children: artist.name
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 break-words text-xs font-medium text-accent",
                            children: artist.role
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 break-words text-xs text-muted-foreground",
                            children: artist.style
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 break-words text-sm leading-relaxed text-muted-foreground",
                            children: artist.description
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-xs text-muted-foreground",
                            children: [
                                "代表作品：",
                                artist.works.join("、")
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 291,
                            columnNumber: 13
                        }, this),
                        artist.personalReason.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-foreground",
                            children: [
                                "喜欢的原因：",
                                artist.personalReason
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 292,
                            columnNumber: 46
                        }, this),
                        url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs text-accent",
                            children: [
                                "艺人主页",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    "aria-hidden": true,
                                    className: "h-3 w-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 293,
                                    columnNumber: 162
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 293,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        cover && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `interest-cover relative flex w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm sm:w-28 ${item.category === "film" ? "aspect-[736/934]" : "h-24 sm:h-28"}`,
                            children: failed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-2xl text-accent/60",
                                "aria-label": "封面暂不可用",
                                children: item.title.slice(0, 1)
                            }, void 0, false, {
                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                lineNumber: 299,
                                columnNumber: 27
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                                src: cover,
                                alt: `${item.title}封面`,
                                fill: true,
                                unoptimized: true,
                                sizes: "112px",
                                className: "object-contain",
                                onError: ()=>setFailed(true)
                            }, void 0, false, {
                                fileName: "[project]/src/components/interests/interest-archive.tsx",
                                lineNumber: 299,
                                columnNumber: 133
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 298,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1 pr-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "break-words text-base font-semibold leading-snug",
                                    children: item.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this),
                                item.creator?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 break-words text-xs text-muted-foreground",
                                    children: item.category === "film" ? `主演：${item.cast?.join("、") ?? item.creator}` : item.creator
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 304,
                                    columnNumber: 40
                                }, this),
                                (item.album || item.releaseYear) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 break-words text-xs text-muted-foreground",
                                    children: [
                                        item.album,
                                        item.releaseYear
                                    ].filter(Boolean).join(" · ")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 305,
                                    columnNumber: 52
                                }, this),
                                item.description?.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-muted-foreground",
                                    children: item.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 306,
                                    columnNumber: 44
                                }, this),
                                url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "mt-3 inline-flex items-center gap-1.5 rounded-sm text-xs text-accent",
                                    children: [
                                        item.category === "film" ? `在${item.platform ?? "正版平台"}打开` : "在网易云音乐打开",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                            "aria-hidden": true,
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                                            lineNumber: 307,
                                            columnNumber: 233
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                                    lineNumber: 307,
                                    columnNumber: 23
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/interests/interest-archive.tsx",
                            lineNumber: 302,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/interests/interest-archive.tsx",
                    lineNumber: 296,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/interests/interest-archive.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/interests/interest-archive.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
_s2(InterestPreview, "40nx3TNiSRb4mt2vZ+ihSIorsPk=");
_c2 = InterestPreview;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "InterestArchive");
__turbopack_context__.k.register(_c1, "ArtistPortrait");
__turbopack_context__.k.register(_c2, "InterestPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/travel/map-regions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "boundsOf",
    ()=>boundsOf,
    "buildInsetOption",
    ()=>buildInsetOption,
    "buildMapSeries",
    ()=>buildMapSeries,
    "featureCenter",
    ()=>featureCenter,
    "mapNameFor",
    ()=>mapNameFor,
    "projectionOf",
    ()=>projectionOf,
    "regionOptionId",
    ()=>regionOptionId
]);
function mapNameFor(scope) {
    return `travel-${scope}`;
}
function regionOptionId(scope, id) {
    return `travel-region-${scope}-${id}`;
}
function buildMapSeries({ regions, visitedIds, hoveredId, selectedId, colors, bounds }) {
    const data = regions.filter((f)=>f.properties.name).map((f)=>{
        const id = Number(f.properties.adcode);
        const visited = visitedIds.has(id);
        const isSelected = id === selectedId;
        const isHovered = id === hoveredId;
        // 悬停只动描边与投影，填充保持不变，避免整块颜色跳变。
        const areaColor = visited ? colors.tileVisited : colors.tile;
        return {
            name: f.properties.name,
            value: visited ? 1 : 0,
            itemStyle: {
                areaColor,
                borderColor: isSelected ? colors.selected : isHovered ? colors.hover : colors.border,
                borderWidth: isSelected ? 2 : isHovered ? 1.6 : 0.6,
                // 只在有强调时才投影，未交互的区域保持平面，避免整张图发灰。
                shadowBlur: isSelected ? 12 : isHovered ? 8 : 0,
                shadowColor: isSelected ? colors.selected : colors.glow
            }
        };
    });
    return {
        type: "map",
        roam: false,
        selectedMode: false,
        label: {
            show: false
        },
        emphasis: {
            disabled: true
        },
        select: {
            disabled: true
        },
        itemStyle: {
            areaColor: colors.tile,
            borderColor: colors.border,
            borderWidth: 0.6
        },
        ...bounds ? {
            boundingCoords: [
                [
                    bounds[0],
                    bounds[3]
                ],
                [
                    bounds[2],
                    bounds[1]
                ]
            ]
        } : {},
        data
    };
}
// ── 经纬度 → 屏幕比例 ─────────────────────────────────────────
// echarts 默认用墨卡托投影，纬度方向要按投影后的值算比例，
// 直接把纬度线性归一化会让南北偏移。下面这组换算同时用于
// 键盘焦点环的落点。
/** 墨卡托投影后的纵坐标（无量纲，只用于比值）。 */ function mercatorY(lat) {
    return Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360)) * (180 / Math.PI);
}
function projectionOf(bounds) {
    const [minLon, minLat, maxLon, maxLat] = bounds;
    const yTop = mercatorY(maxLat);
    const yBottom = mercatorY(minLat);
    const spanX = maxLon - minLon || 1;
    const spanY = yTop - yBottom || 1;
    return {
        toPoint (lon, lat) {
            return {
                x: (lon - minLon) / spanX,
                y: (yTop - mercatorY(lat)) / spanY
            };
        }
    };
}
function featureCenter(f) {
    const c = f.properties.centroid ?? f.properties.center;
    if (Array.isArray(c) && typeof c[0] === "number" && typeof c[1] === "number") {
        return [
            c[0],
            c[1]
        ];
    }
    return null;
}
function boundsOf(features) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const walk = (c)=>{
        if (typeof c === "number") return;
        if (Array.isArray(c) && typeof c[0] === "number" && typeof c[1] === "number") {
            const [x, y] = c;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
            return;
        }
        if (Array.isArray(c)) for (const item of c)walk(item);
    };
    for (const f of features){
        walk(f.geometry?.coordinates);
    }
    if (!Number.isFinite(minX)) return null;
    return [
        minX,
        minY,
        maxX,
        maxY
    ];
}
function buildInsetOption({ geoName, bounds, colors }) {
    const [minLon, minLat, maxLon, maxLat] = bounds;
    const itemStyle = {
        areaColor: colors.tile,
        borderColor: colors.border,
        borderWidth: 0.6
    };
    const inert = {
        silent: true,
        emphasis: {
            disabled: true
        },
        select: {
            disabled: true
        }
    };
    return {
        geo: [
            {
                map: geoName,
                boundingCoords: [
                    [
                        minLon,
                        maxLat
                    ],
                    [
                        maxLon,
                        minLat
                    ]
                ],
                // 缩到右下角，给主图让出空间；高度由宽度与投影比例决定。
                left: "80%",
                bottom: "5%",
                width: "16%",
                aspectScale: 1,
                itemStyle,
                ...inert
            }
        ],
        series: [
            {
                type: "map",
                map: geoName,
                geoIndex: 0,
                data: [],
                itemStyle,
                ...inert
            }
        ]
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/travel/map-theme.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ECharts 画在 canvas 上，拿不到 CSS 变量和 Tailwind 的类名，
// 所以这里把 globals.css 里的地图 token 读出来，转成 ECharts 需要的颜色值。
// 主题只有一处定义（globals.css），这里只负责读取。
__turbopack_context__.s([
    "readMapColors",
    ()=>readMapColors
]);
/** 每个 token 的兜底值，对应深色主题；读取失败时也不会画成透明。 */ const fallback = {
    surface: "rgba(12, 24, 42, 0.55)",
    tile: "rgba(24, 40, 64, 0.72)",
    tileVisited: "rgba(52, 122, 172, 0.72)",
    visitedStrong: "#a5dcfb",
    border: "rgba(150, 205, 240, 0.22)",
    hover: "#cfeaff",
    selected: "#ffffff",
    glow: "rgba(111, 195, 240, 0.35)"
};
const tokenNames = {
    surface: "--map-surface",
    tile: "--map-tile",
    tileVisited: "--map-tile-visited",
    visitedStrong: "--map-visited-strong",
    border: "--map-border",
    hover: "--map-hover",
    selected: "--map-selected",
    glow: "--map-glow"
};
function readMapColors(theme) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const styles = getComputedStyle(document.documentElement);
    const result = {
        ...theme === "light" ? lightFallback : fallback
    };
    for (const key of Object.keys(tokenNames)){
        const value = styles.getPropertyValue(tokenNames[key]).trim();
        // 变量存在就用变量；缺失时保留同主题的兜底值。
        if (value) result[key] = value;
    }
    return result;
}
const lightFallback = {
    surface: "rgba(232, 241, 248, 0.6)",
    tile: "#dbe7f1",
    tileVisited: "#a8d5ef",
    visitedStrong: "#166a9c",
    border: "rgba(24, 92, 132, 0.28)",
    hover: "#0b5d8c",
    selected: "#082f4a",
    glow: "rgba(47, 141, 196, 0.22)"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/travel/province-index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 省级行政区索引：adcode 与名称的对照，以及省内视图需要的少量配置。
//
// 地图数据与记录匹配一律走 adcode，名称只用于显示 —— 靠中文名匹配
// 会在「内蒙古自治区 / 内蒙古」这类写法上悄悄失效。
//
// 子级数据由 public/data/provinces/{adcode}.json 提供；数据抓取脚本不属于应用运行时。
/** 直辖市与特别行政区的下一级是市辖区，其余省级单位的下一级是地级市等。 */ __turbopack_context__.s([
    "DEFAULT_MAP_BOUNDS",
    ()=>DEFAULT_MAP_BOUNDS,
    "NATION_BOUNDS",
    ()=>NATION_BOUNDS,
    "findProvince",
    ()=>findProvince,
    "provinces",
    ()=>provinces,
    "subLevelUrl",
    ()=>subLevelUrl
]);
const provinces = [
    {
        name: "北京市",
        adcode: 110000,
        subLevelLabel: "市辖区",
        subLevel: "district"
    },
    {
        name: "天津市",
        adcode: 120000,
        subLevelLabel: "市辖区",
        subLevel: "district"
    },
    {
        name: "河北省",
        adcode: 130000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "山西省",
        adcode: 140000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "内蒙古自治区",
        adcode: 150000,
        subLevelLabel: "盟市",
        subLevel: "city"
    },
    {
        name: "辽宁省",
        adcode: 210000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "吉林省",
        adcode: 220000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "黑龙江省",
        adcode: 230000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "上海市",
        adcode: 310000,
        subLevelLabel: "市辖区",
        subLevel: "district"
    },
    {
        name: "江苏省",
        adcode: 320000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "浙江省",
        adcode: 330000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "安徽省",
        adcode: 340000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "福建省",
        adcode: 350000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "江西省",
        adcode: 360000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "山东省",
        adcode: 370000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "河南省",
        adcode: 410000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "湖北省",
        adcode: 420000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "湖南省",
        adcode: 430000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "广东省",
        adcode: 440000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "广西壮族自治区",
        adcode: 450000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "海南省",
        adcode: 460000,
        subLevelLabel: "地级市",
        subLevel: "city",
        // 海南岛本岛（含海口、三亚、儋州一带）；西沙、南沙等岛礁不在首选视野内，
        // 越界也不影响它们被点亮与点击。
        bounds: [
            108.0,
            18.0,
            111.3,
            20.4
        ]
    },
    {
        name: "重庆市",
        adcode: 500000,
        subLevelLabel: "市辖区",
        subLevel: "district"
    },
    {
        name: "四川省",
        adcode: 510000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "贵州省",
        adcode: 520000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "云南省",
        adcode: 530000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "西藏自治区",
        adcode: 540000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "陕西省",
        adcode: 610000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "甘肃省",
        adcode: 620000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "青海省",
        adcode: 630000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "宁夏回族自治区",
        adcode: 640000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "新疆维吾尔自治区",
        adcode: 650000,
        subLevelLabel: "地级市",
        subLevel: "city"
    },
    {
        name: "台湾省",
        adcode: 710000,
        subLevelLabel: "县市",
        subLevel: "city",
        // 县市数据包含金门、连江与澎湖，范围覆盖本岛及主要离岛。
        bounds: [
            118.1,
            21.8,
            122.1,
            26.4
        ]
    },
    {
        name: "香港特别行政区",
        adcode: 810000,
        subLevelLabel: "区",
        subLevel: "district"
    },
    {
        name: "澳门特别行政区",
        adcode: 820000,
        subLevelLabel: "堂区",
        subLevel: "district"
    }
];
const byAdcode = new Map(provinces.map((p)=>[
        p.adcode,
        p
    ]));
function findProvince(adcode) {
    return byAdcode.get(adcode);
}
const NATION_BOUNDS = [
    73.4,
    17,
    135.2,
    53.6
];
const DEFAULT_MAP_BOUNDS = NATION_BOUNDS;
function subLevelUrl(adcode) {
    return `/data/provinces/${adcode}.json`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/travel/province-index.ts [app-client] (ecmascript) <export provinces as provinceIndex>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "provinceIndex",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["provinces"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/travel/province-index.ts [app-client] (ecmascript)");
}),
"[project]/src/components/travel/travel-section.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TravelSection",
    ()=>TravelSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/camera.mjs [app-client] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/compass.mjs [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pinned$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinned$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pinned.mjs [app-client] (ecmascript) <export default as MapPinned>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$route$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Route$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/route.mjs [app-client] (ecmascript) <export default as Route>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2f$use$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/theme/use-theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/data/travel.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__provinces__as__provinceIndex$3e$__ = __turbopack_context__.i("[project]/src/components/travel/province-index.ts [app-client] (ecmascript) <export provinces as provinceIndex>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$map$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/travel/map-theme.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$map$2d$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/travel/map-regions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/travel/province-index.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
// echarts 体积不小，地图又是页面下方的独立模块，所以按需加载：
// 首屏 HTML 里只有这个占位，等交互内容挂载后再拉地图代码。
const LazyTravelMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/travel/travel-map.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((m)=>m.TravelMap), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/travel/travel-map.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full w-full items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: "地图加载中…"
            }, void 0, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/travel/travel-section.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
});
_c = LazyTravelMap;
/** 只在模块进入视口后才真正挂载 echarts，避免页面打开时就加载整张地图。 */ function TravelMap(props) {
    _s();
    const holderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // 初始值直接由环境推导（没有 IntersectionObserver 就当作已可见），
    // 这样不必在 effect 里同步 setState，避免级联渲染。
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TravelMap.useState": ()=>("TURBOPACK compile-time value", "object") !== "undefined" && typeof IntersectionObserver === "undefined"
    }["TravelMap.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TravelMap.useEffect": ()=>{
            const el = holderRef.current;
            if (!el || visible) return;
            const observer = new IntersectionObserver({
                "TravelMap.useEffect": (entries)=>{
                    if (entries.some({
                        "TravelMap.useEffect": (e)=>e.isIntersecting
                    }["TravelMap.useEffect"])) {
                        setVisible(true);
                        observer.disconnect();
                    }
                }
            }["TravelMap.useEffect"], {
                rootMargin: "200px 0px"
            });
            observer.observe(el);
            return ({
                "TravelMap.useEffect": ()=>observer.disconnect()
            })["TravelMap.useEffect"];
        }
    }["TravelMap.useEffect"], [
        visible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: holderRef,
        className: "h-full w-full",
        children: visible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LazyTravelMap, {
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/travel/travel-section.tsx",
            lineNumber: 80,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full w-full items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-muted-foreground",
                children: "地图加载中…"
            }, void 0, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 83,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/travel/travel-section.tsx",
            lineNumber: 82,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/travel/travel-section.tsx",
        lineNumber: 78,
        columnNumber: 5
    }, this);
}
_s(TravelMap, "cyT/e1BN01w51DvvjrIacofPUR8=");
_c1 = TravelMap;
const NATION_URL = "/data/china-provinces.json";
/** 从名称尾缀 + 省级配置推导行政区类型（地级市、市辖区、自治州…）。 */ function deriveKind(name, adcode, province) {
    // 精确匹配的后缀优先：自治州、盟、地区、林区、自治县、自治旗、新区、堂区。
    if (name.endsWith("自治州")) return "自治州";
    if (name.endsWith("盟")) return "盟";
    if (name.endsWith("地区")) return "地区";
    if (name.endsWith("林区")) return "林区";
    if (name.endsWith("自治县")) return "自治县";
    if (name.endsWith("自治旗")) return "自治旗";
    if (name.endsWith("新区")) return "新区";
    if (name.endsWith("堂区")) return "堂区";
    // 市：先判断 adcode 90 系列（省直辖县级行政区），再按层级区分地级市与县级市。
    if (name.endsWith("市")) {
        const series = Math.floor(adcode / 100) % 100;
        if (series === 90) return "县级市";
        return province.subLevel === "city" ? "地级市" : "县级市";
    }
    // 区：市辖区
    if (name.endsWith("区")) return province.subLevel === "district" ? "市辖区" : "区";
    // 县
    if (name.endsWith("县")) return "县";
    // 回落到省级配置的通用称呼
    return province.subLevelLabel;
}
/** 从 GeoJSON collection 构建 Region 列表，丢弃 adcode 不是数字的要素。 */ function buildRegions(collection, visitedIds, province) {
    const seen = new Set();
    return collection.features.map((f)=>{
        const id = Number(f.properties.adcode);
        if (!Number.isInteger(id) || id < 100000 || id > 999999 || !f.properties.name) return null;
        if (province.adcode === 100000 ? !(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProvince"])(id) : Math.floor(id / 10000) !== Math.floor(province.adcode / 10000) || id === province.adcode) return null;
        if (seen.has(id)) return null;
        seen.add(id);
        const name = f.properties.name ?? "";
        const kind = province.adcode === 100000 ? "省级行政区" : deriveKind(name, id, province);
        const visited = visitedIds.has(id);
        return {
            id,
            name,
            kind,
            visited
        };
    }).filter((r)=>r !== null);
}
/** 省份名称/adcode -> 可作为 DOM id 的安全字符串。 */ function regionOptionId(scope, id) {
    return `travel-region-${scope}-${id}`;
}
function formatDates(visit) {
    if (!visit?.dates?.length) return "";
    return visit.dates.join(" · ");
}
const cityLabelExcludedProvinces = new Set([
    110000,
    120000,
    310000,
    500000,
    810000,
    820000
]);
function getProvinceCities(visit, province) {
    if (!visit?.cities?.length || !province || cityLabelExcludedProvinces.has(province.adcode)) return [];
    return visit.cities;
}
function CityLabels({ visit, province }) {
    const cities = getProvinceCities(visit, province);
    if (cities.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
        className: "mb-3 flex min-w-0 flex-wrap gap-1.5",
        children: cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "glass-chip rounded-md px-2 py-0.5 text-xs text-muted-foreground",
                children: city
            }, city, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 182,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/travel/travel-section.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_c2 = CityLabels;
function TravelSection() {
    _s1();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2f$use$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        scope: "nation"
    });
    const [nationCollection, setNationCollection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [provinceResult, setProvinceResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        key: null,
        status: "idle",
        collection: null
    });
    const [nationLoadError, setNationLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusId, setFocusId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const nationSelectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        selectedId: null,
        focusId: null
    });
    const legendRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [legendKey, setLegendKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // 全国 GeoJSON 在挂载时加载一次，失败时只让地图退化成提示，不影响页面其余部分。
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TravelSection.useEffect": ()=>{
            let cancelled = false;
            fetch(NATION_URL).then({
                "TravelSection.useEffect": (res)=>{
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                }
            }["TravelSection.useEffect"]).then({
                "TravelSection.useEffect": (data)=>{
                    if (cancelled) return;
                    if (!Array.isArray(data?.features) || data.features.length === 0) {
                        throw new Error("GeoJSON 结构异常");
                    }
                    setNationCollection(data);
                }
            }["TravelSection.useEffect"]).catch({
                "TravelSection.useEffect": ()=>{
                    if (!cancelled) setNationLoadError(true);
                }
            }["TravelSection.useEffect"]);
            return ({
                "TravelSection.useEffect": ()=>{
                    cancelled = true;
                }
            })["TravelSection.useEffect"];
        }
    }["TravelSection.useEffect"], []);
    const provinceRequestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TravelSection.useEffect": ()=>({
                "TravelSection.useEffect": ()=>provinceRequestRef.current?.abort()
            })["TravelSection.useEffect"]
    }["TravelSection.useEffect"], []);
    const loadProvince = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TravelSection.useCallback[loadProvince]": (adcode)=>{
            provinceRequestRef.current?.abort();
            const controller = new AbortController();
            provinceRequestRef.current = controller;
            setProvinceResult({
                key: adcode,
                status: "loading",
                collection: null
            });
            fetch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subLevelUrl"])(adcode), {
                signal: controller.signal
            }).then({
                "TravelSection.useCallback[loadProvince]": (res)=>{
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.json();
                }
            }["TravelSection.useCallback[loadProvince]"]).then({
                "TravelSection.useCallback[loadProvince]": (data)=>{
                    if (controller.signal.aborted) return;
                    if (!Array.isArray(data?.features) || data.features.length === 0) {
                        throw new Error("GeoJSON 结构异常");
                    }
                    setProvinceResult({
                        "TravelSection.useCallback[loadProvince]": (current)=>current.key === adcode ? {
                                key: adcode,
                                status: "success",
                                collection: data
                            } : current
                    }["TravelSection.useCallback[loadProvince]"]);
                }
            }["TravelSection.useCallback[loadProvince]"]).catch({
                "TravelSection.useCallback[loadProvince]": ()=>{
                    if (controller.signal.aborted) return;
                    setProvinceResult({
                        "TravelSection.useCallback[loadProvince]": (current)=>current.key === adcode ? {
                                key: adcode,
                                status: "error",
                                collection: null
                            } : current
                    }["TravelSection.useCallback[loadProvince]"]);
                }
            }["TravelSection.useCallback[loadProvince]"]);
        }
    }["TravelSection.useCallback[loadProvince]"], []);
    // 主题切换后重新读一次地图 token：图例与信息卡靠 CSS 变量自动跟随，
    // 地图内部颜色走这里。选中状态存在 React 里，换主题不会丢失。
    const colors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TravelSection.useMemo[colors]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$map$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readMapColors"])(theme)
    }["TravelSection.useMemo[colors]"], [
        theme
    ]);
    // 图例在窄屏可能换行，换行后地图容器高度变化，触发一次 resize。
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TravelSection.useEffect": ()=>{
            const el = legendRef.current;
            if (!el || typeof ResizeObserver === "undefined") return;
            const observer = new ResizeObserver({
                "TravelSection.useEffect": ()=>setLegendKey({
                        "TravelSection.useEffect": (k)=>k + 1
                    }["TravelSection.useEffect"])
            }["TravelSection.useEffect"]);
            observer.observe(el);
            return ({
                "TravelSection.useEffect": ()=>observer.disconnect()
            })["TravelSection.useEffect"];
        }
    }["TravelSection.useEffect"], [
        nationCollection,
        provinceResult.collection
    ]);
    const derived = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TravelSection.useMemo[derived]": ()=>{
            if (view.scope === "nation") {
                if (!nationCollection) return null;
                const scope = "nation";
                const province = {
                    name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].nationalLabel,
                    adcode: 100000,
                    subLevelLabel: "省级行政区",
                    subLevel: "city"
                };
                const collection = nationCollection;
                const visitedIds = new Set();
                for (const entry of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__provinces__as__provinceIndex$3e$__["provinceIndex"]){
                    const visit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getVisitByAdcode"])(entry.adcode, entry.name);
                    if (visit && visit.visited !== false) visitedIds.add(entry.adcode);
                }
                const regions = buildRegions(collection, visitedIds, province);
                const matchedIds = new Set(regions.map({
                    "TravelSection.useMemo[derived]": (region)=>region.id
                }["TravelSection.useMemo[derived]"]));
                for (const id of visitedIds)if (!matchedIds.has(id)) visitedIds.delete(id);
                const total = regions.length;
                return {
                    scope,
                    province,
                    collection,
                    bounds: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NATION_BOUNDS"],
                    visitedIds,
                    total,
                    regions,
                    visit: undefined
                };
            }
            const adcode = view.adcode;
            const province = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProvince"])(adcode);
            if (!province) return null;
            const collection = provinceResult.key === adcode ? provinceResult.collection : null;
            const visit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getVisitByAdcode"])(adcode, province.name);
            const visitedIds = new Set();
            for (const area of visit?.areas ?? []){
                const matched = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAreaVisit"])(visit, area.adcode);
                if (matched && matched.visited !== false) visitedIds.add(area.adcode);
            }
            const bounds = province.bounds ?? (collection ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$map$2d$regions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOf"])(collection.features) : null) ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_MAP_BOUNDS"];
            const regions = collection ? buildRegions(collection, visitedIds, province) : [];
            const matchedIds = new Set(regions.map({
                "TravelSection.useMemo[derived]": (region)=>region.id
            }["TravelSection.useMemo[derived]"]));
            for (const id of visitedIds)if (!matchedIds.has(id)) visitedIds.delete(id);
            const total = regions.length;
            return {
                scope: String(adcode),
                province,
                collection,
                bounds,
                visitedIds,
                total,
                regions,
                visit
            };
        }
    }["TravelSection.useMemo[derived]"], [
        view,
        nationCollection,
        provinceResult
    ]);
    const handleHover = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TravelSection.useCallback[handleHover]": (id)=>setHoveredId(id)
    }["TravelSection.useCallback[handleHover]"], []);
    const handleSelect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TravelSection.useCallback[handleSelect]": (id)=>{
            if (id === null) return;
            if (view.scope === "nation") {
                const province = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProvince"])(id);
                if (!province) return;
                provinceRequestRef.current?.abort();
                if (province.unavailableReason) {
                    setProvinceResult({
                        key: id,
                        status: "idle",
                        collection: null
                    });
                } else {
                    loadProvince(id);
                }
                nationSelectionRef.current = {
                    selectedId: id,
                    focusId: id
                };
                setView({
                    scope: "province",
                    adcode: id
                });
                setSelectedId(null);
                setFocusId(null);
                setHoveredId(null);
                return;
            }
            setSelectedId(id);
            setFocusId(id);
        }
    }["TravelSection.useCallback[handleSelect]"], [
        view.scope,
        loadProvince
    ]);
    const handleBack = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TravelSection.useCallback[handleBack]": ()=>{
            const nationSelection = nationSelectionRef.current;
            provinceRequestRef.current?.abort();
            setProvinceResult({
                key: null,
                status: "idle",
                collection: null
            });
            setView({
                scope: "nation"
            });
            setSelectedId(nationSelection.selectedId);
            setFocusId(nationSelection.focusId);
            setHoveredId(null);
        }
    }["TravelSection.useCallback[handleBack]"], []);
    // 键盘浏览：用列表顺序前后移动，方向键的含义在 aria 文案里说明。
    // 焦点始终停在容器上，由 aria-activedescendant 指向当前行政区，
    // 当前行政区使用悬停描边，并显示名称与状态。
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TravelSection.useCallback[handleKeyDown]": (event)=>{
            if (!derived) return;
            const { regions } = derived;
            if (regions.length === 0) return;
            const current = focusId !== null ? regions.findIndex({
                "TravelSection.useCallback[handleKeyDown]": (r)=>r.id === focusId
            }["TravelSection.useCallback[handleKeyDown]"]) : -1;
            const index = current < 0 ? 0 : current;
            const move = {
                "TravelSection.useCallback[handleKeyDown].move": (next)=>{
                    const clamped = Math.min(Math.max(next, 0), regions.length - 1);
                    const target = regions[clamped];
                    setFocusId(target.id);
                    setHoveredId(target.id);
                }
            }["TravelSection.useCallback[handleKeyDown].move"];
            switch(event.key){
                case "ArrowRight":
                case "ArrowDown":
                    event.preventDefault();
                    move(index + 1);
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    event.preventDefault();
                    move(index - 1);
                    break;
                case "Home":
                    event.preventDefault();
                    move(0);
                    break;
                case "End":
                    event.preventDefault();
                    move(regions.length - 1);
                    break;
                case "Enter":
                case " ":
                    event.preventDefault();
                    if (focusId !== null) {
                        handleSelect(focusId);
                    } else {
                        handleSelect(regions[0].id);
                    }
                    break;
                case "Escape":
                    if (view.scope === "province") {
                        handleBack();
                    } else {
                        setSelectedId(null);
                        setFocusId(null);
                    }
                    break;
                default:
                    break;
            }
        }
    }["TravelSection.useCallback[handleKeyDown]"], [
        derived,
        focusId,
        view,
        handleSelect,
        handleBack
    ]);
    // 信息卡显示的内容：全国视图看省级记录，省内视图看市级记录。
    const detailRecord = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TravelSection.useMemo[detailRecord]": ()=>{
            const activeId = selectedId ?? hoveredId;
            if (activeId === null || !derived) return null;
            if (view.scope === "nation") {
                const province = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProvince"])(activeId);
                if (!province) return null;
                const visit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getVisitByAdcode"])(activeId, province.name);
                return {
                    name: province.name,
                    kind: "省级行政区",
                    visit,
                    areaVisit: undefined,
                    province
                };
            } else {
                const region = derived.regions.find({
                    "TravelSection.useMemo[detailRecord].region": (r)=>r.id === activeId
                }["TravelSection.useMemo[detailRecord].region"]);
                if (!region) return null;
                const areaVisit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getAreaVisit"])(derived.visit, activeId);
                return {
                    name: region.name,
                    kind: region.kind,
                    visit: undefined,
                    areaVisit,
                    province: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProvince"])(view.adcode)
                };
            }
        }
    }["TravelSection.useMemo[detailRecord]"], [
        selectedId,
        hoveredId,
        derived,
        view
    ]);
    const hoveredRegion = derived?.regions.find((region)=>region.id === hoveredId);
    const activeProvince = view.scope === "province" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findProvince"])(view.adcode) : undefined;
    const visitedCount = derived?.visitedIds.size ?? 0;
    const totalCount = view.scope === "nation" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__provinces__as__provinceIndex$3e$__["provinceIndex"].length : derived?.total ?? 0;
    const progressText = view.scope === "nation" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].progress.replace("{visited}", String(visitedCount)).replace("{total}", String(totalCount)) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].progressProvince.replace("{province}", derived?.province.name ?? "").replace("{visited}", String(visitedCount)).replace("{total}", String(totalCount)).replace("{unit}", derived?.province.subLevelLabel ?? "");
    const hintText = view.scope === "nation" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].hint : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].hintProvince.replace("{unit}", derived?.province.subLevelLabel ?? "");
    const activeCollection = view.scope === "nation" ? nationCollection : derived?.collection;
    const provinceStatus = view.scope === "province" ? provinceResult.status : "idle";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-reveal": true,
        className: "mt-12 w-full max-w-full min-w-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].eyebrow
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 468,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold tracking-tight",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].title
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 471,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 467,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-xs text-muted-foreground tabular-nums",
                        children: progressText
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 473,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-relaxed text-muted-foreground",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].subtitle
            }, void 0, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 478,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "glass mt-5 box-border w-full max-w-full min-w-0 rounded-xl p-4 backdrop-blur-md sm:p-5 lg:h-[clamp(35rem,calc(100vh-12rem),38.75rem)]",
                children: nationLoadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-[20rem] flex-col items-center justify-center gap-2 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-medium",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].errorTitle
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 486,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].errorBody
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 487,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/travel/travel-section.tsx",
                    lineNumber: 485,
                    columnNumber: 11
                }, this) : !nationCollection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-[20rem] items-center justify-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: "地图加载中…"
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 491,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/travel/travel-section.tsx",
                    lineNumber: 490,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid h-full min-h-0 w-full min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,23.75rem)] lg:items-stretch lg:gap-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-full min-h-0 min-w-0 flex-col",
                            children: [
                                view.scope === "province" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: handleBack,
                                    className: "mb-3 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": true,
                                            children: "←"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 502,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].back
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 503,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 497,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    ref: legendRef,
                                    className: "mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "inline-flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "h-3 w-3 rounded-[3px] border",
                                                    style: {
                                                        background: colors.tileVisited,
                                                        borderColor: colors.border
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                                    lineNumber: 512,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].legendVisited
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 511,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "inline-flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": true,
                                                    className: "h-3 w-3 rounded-[3px] border",
                                                    style: {
                                                        background: colors.tile,
                                                        borderColor: colors.border
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                                    lineNumber: 520,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].legendUnvisited
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                                    lineNumber: 525,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 519,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "ml-auto hidden sm:block",
                                            children: hintText
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 527,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 507,
                                    columnNumber: 15
                                }, this),
                                view.scope === "province" && provinceStatus === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-[20rem] items-center justify-center rounded-lg sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground",
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].loadingProvince
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/travel/travel-section.tsx",
                                        lineNumber: 532,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 531,
                                    columnNumber: 17
                                }, this) : view.scope === "province" && derived?.province.unavailableReason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-[20rem] flex-col items-center justify-center gap-2 rounded-lg text-center sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].provinceUnavailable
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 536,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: derived.province.unavailableReason
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 537,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 535,
                                    columnNumber: 17
                                }, this) : view.scope === "province" && provinceStatus === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-[20rem] flex-col items-center justify-center gap-3 rounded-lg text-center sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].errorTitle
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 541,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].errorBody
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 542,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>loadProvince(view.adcode),
                                            className: "rounded-md border px-3 py-1.5 text-sm hover:bg-muted",
                                            children: "重试"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 543,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 540,
                                    columnNumber: 17
                                }, this) : activeCollection && derived ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    role: "listbox",
                                    "aria-label": view.scope === "nation" ? "中国省级地图。用方向键浏览省份，回车进入省内地图，Esc 取消选中。" : `${derived.province.name}${derived.province.subLevelLabel}地图。用方向键浏览${derived.province.subLevelLabel}，回车查看记录，Esc 返回全国地图。`,
                                    "aria-activedescendant": focusId !== null ? regionOptionId(derived.scope, focusId) : undefined,
                                    tabIndex: 0,
                                    onKeyDown: handleKeyDown,
                                    onMouseLeave: ()=>setHoveredId(null),
                                    onBlur: ()=>{
                                        setHoveredId(null);
                                    },
                                    className: "relative h-[20rem] w-full touch-pan-y rounded-lg outline-offset-4 select-none sm:h-[24rem] lg:h-auto lg:min-h-0 lg:flex-1",
                                    style: {
                                        background: colors.surface
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TravelMap, {
                                            collection: activeCollection,
                                            scope: derived.scope,
                                            visitedIds: derived.visitedIds,
                                            colors: colors,
                                            hoveredId: hoveredId,
                                            selectedId: selectedId,
                                            onHoverChange: handleHover,
                                            onSelectChange: handleSelect,
                                            bounds: derived.bounds,
                                            relayoutKey: legendKey
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 568,
                                            columnNumber: 19
                                        }, this),
                                        hoveredRegion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            role: "status",
                                            className: "glass-chip pointer-events-none absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-md px-3 py-2 text-xs",
                                            children: [
                                                hoveredRegion.name,
                                                " · ",
                                                hoveredRegion.kind,
                                                " · ",
                                                hoveredRegion.visited ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].legendVisited : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].legendUnvisited
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 582,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sr-only",
                                            children: derived.regions.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    id: regionOptionId(derived.scope, r.id),
                                                    role: "option",
                                                    "aria-selected": selectedId === r.id,
                                                    "aria-label": `${r.name}，${r.kind}，${r.visited ? "已点亮" : "未点亮"}`
                                                }, r.id, false, {
                                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                                    lineNumber: 591,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 589,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 548,
                                    columnNumber: 17
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 495,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailPanel, {
                            record: detailRecord,
                            province: view.scope === "province" ? activeProvince : undefined,
                            areaCount: view.scope === "province" ? visitedCount : 0,
                            footprintVisited: visitedCount,
                            footprintTotal: totalCount,
                            countPending: view.scope === "province" && !activeCollection,
                            visit: view.scope === "province" ? derived?.visit : undefined,
                            onClear: ()=>{
                                setSelectedId(null);
                                setHoveredId(null);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 604,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/travel/travel-section.tsx",
                    lineNumber: 494,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 483,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/travel/travel-section.tsx",
        lineNumber: 465,
        columnNumber: 5
    }, this);
}
_s1(TravelSection, "ktevyuf36R5raULRYzYHQHUojFc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$theme$2f$use$2d$theme$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c3 = TravelSection;
function TravelCover({ name, src }) {
    _s2();
    const [showImage, setShowImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Boolean(src));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-has-image": showImage && Boolean(src),
        className: `mt-4 flex min-h-40 max-h-[20rem] items-center justify-center${showImage && src ? "" : " travel-cover overflow-hidden rounded-lg border border-border/60 px-2"}`,
        children: showImage && src ? // eslint-disable-next-line @next/next/no-img-element
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: `${name}旅行记录封面`,
            className: "block h-auto max-h-full w-auto max-w-full object-contain",
            onError: ()=>setShowImage(false)
        }, void 0, false, {
            fileName: "[project]/src/components/travel/travel-section.tsx",
            lineNumber: 651,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full min-h-40 w-full items-center justify-center px-4 text-center text-muted-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].coverPlaceholder
            }, void 0, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 659,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/travel/travel-section.tsx",
            lineNumber: 658,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/travel/travel-section.tsx",
        lineNumber: 645,
        columnNumber: 5
    }, this);
}
_s2(TravelCover, "z7xu5ES6Oxj65Xvo43Krdf/ssGE=");
_c4 = TravelCover;
function TravelThemeItem({ icon: Icon, title, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-3 border-b border-border/50 pb-3 last:border-b-0 last:pb-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                "aria-hidden": true,
                className: "mt-0.5 h-4 w-4 shrink-0 text-accent",
                strokeWidth: 1.8
            }, void 0, false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 677,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-medium",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 679,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs leading-relaxed text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 680,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 678,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/travel/travel-section.tsx",
        lineNumber: 676,
        columnNumber: 5
    }, this);
}
_c5 = TravelThemeItem;
function DetailPanel({ record, province, visit, areaCount, footprintVisited, footprintTotal, countPending, onClear }) {
    const provinceOverview = !record && province;
    const displayedRecord = record ?? (province ? {
        name: province.name,
        kind: "省级行政区",
        visit,
        areaVisit: undefined,
        province
    } : null);
    if (!displayedRecord) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            "aria-live": "polite",
            className: "glass-chip flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl p-4 text-sm lg:h-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex shrink-0 items-start justify-between gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase",
                                    children: "TRAVEL JOURNAL"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 712,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mt-2 max-w-[16rem] text-lg font-semibold leading-snug tracking-tight",
                                    children: "每一段旅程，都值得被记录。"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 715,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 max-w-[19rem] text-xs leading-relaxed text-muted-foreground",
                                    children: "从地图出发，收藏走过的城市与沿途的风景。"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 718,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 711,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"], {
                            "aria-hidden": true,
                            className: "h-6 w-6 shrink-0 text-accent",
                            strokeWidth: 1.5
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 722,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/travel/travel-section.tsx",
                    lineNumber: 710,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-7 space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TravelThemeItem, {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pinned$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPinned$3e$__["MapPinned"],
                            title: "探索足迹",
                            description: "点击地图上的省份，查看对应地区的旅行记录。"
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 726,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TravelThemeItem, {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
                            title: "收藏风景",
                            description: "用照片与文字，留住旅途中的风景和记忆。"
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 731,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TravelThemeItem, {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$route$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Route$3e$__["Route"],
                            title: "持续点亮",
                            description: "每一次新的出发，都会让这张地图更加完整。"
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 736,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/travel/travel-section.tsx",
                    lineNumber: 725,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-auto border-t border-border/60 pt-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase",
                            children: "MY TRAVEL FOOTPRINT"
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 744,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-baseline gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-2xl font-semibold tabular-nums tracking-tight text-accent",
                                    children: [
                                        footprintVisited,
                                        " / ",
                                        footprintTotal
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: "个已点亮的省级行政区"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 751,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 747,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xs leading-relaxed text-muted-foreground",
                            children: "点击任意省份，开启一段旅行回忆。"
                        }, void 0, false, {
                            fileName: "[project]/src/components/travel/travel-section.tsx",
                            lineNumber: 753,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/travel/travel-section.tsx",
                    lineNumber: 743,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/travel/travel-section.tsx",
            lineNumber: 706,
            columnNumber: 7
        }, this);
    }
    const { name, kind, visit: provinceVisit, areaVisit, province: recordProvince } = displayedRecord;
    const activeVisit = areaVisit ?? provinceVisit;
    const provinceCities = getProvinceCities(provinceVisit, recordProvince);
    const dates = activeVisit ? formatDates(activeVisit) : "";
    const hasVisit = Boolean(activeVisit && activeVisit.visited !== false);
    const description = activeVisit?.description ?? activeVisit?.notes;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        "aria-live": "polite",
        className: "glass-chip flex min-h-0 min-w-0 flex-col overflow-hidden rounded-xl p-4 text-sm lg:h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shrink-0 flex items-start justify-between gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase",
                                children: kind === "省级行政区" ? "PROVINCE ARCHIVE" : "CITY ARCHIVE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 772,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-1 break-words font-semibold tracking-tight",
                                children: name
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 775,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: kind
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/travel/travel-section.tsx",
                                        lineNumber: 777,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "aria-hidden": true,
                                        children: "·"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/travel/travel-section.tsx",
                                        lineNumber: 778,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: hasVisit ? "text-accent" : undefined,
                                        children: hasVisit ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].legendVisited : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].legendUnvisited
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/travel/travel-section.tsx",
                                        lineNumber: 779,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 776,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 771,
                        columnNumber: 9
                    }, this),
                    record && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClear,
                        className: "shrink-0 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground",
                        children: "清除"
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 784,
                        columnNumber: 20
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 770,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TravelCover, {
                name: name,
                src: activeVisit?.cover
            }, activeVisit?.cover ?? "placeholder", false, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 793,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 min-h-0 flex-1 overflow-y-auto pr-1 leading-relaxed",
                children: [
                    provinceOverview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-3 text-xs text-muted-foreground",
                        children: countPending ? `已登记的${province.subLevelLabel}数量待边界数据校验。` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].visitedAreasSummary.replace("{count}", String(areaCount)).replace("{unit}", province.subLevelLabel)
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 797,
                        columnNumber: 11
                    }, this),
                    !hasVisit || !activeVisit ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].unvisitedBody
                    }, void 0, false, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 806,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 whitespace-pre-wrap break-words text-foreground/90",
                                children: description
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 809,
                                columnNumber: 28
                            }, this) : null,
                            dates && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono tabular-nums",
                                    children: dates
                                }, void 0, false, {
                                    fileName: "[project]/src/components/travel/travel-section.tsx",
                                    lineNumber: 812,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 811,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityLabels, {
                                visit: provinceVisit,
                                province: recordProvince
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 815,
                                columnNumber: 13
                            }, this),
                            !description && !dates && provinceCities.length === 0 && !activeVisit.photos?.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$travel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["travelLabels"].unvisitedNoDetail
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 817,
                                columnNumber: 15
                            }, this),
                            activeVisit.photos?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "grid grid-cols-3 gap-2",
                                children: activeVisit.photos.map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: photo.src,
                                            alt: photo.alt ?? `${name}照片`,
                                            className: "aspect-square w-full rounded-md border border-border/60 object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/travel/travel-section.tsx",
                                            lineNumber: 824,
                                            columnNumber: 21
                                        }, this)
                                    }, photo.src, false, {
                                        fileName: "[project]/src/components/travel/travel-section.tsx",
                                        lineNumber: 822,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/travel/travel-section.tsx",
                                lineNumber: 820,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/travel/travel-section.tsx",
                        lineNumber: 808,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/travel/travel-section.tsx",
                lineNumber: 795,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/travel/travel-section.tsx",
        lineNumber: 769,
        columnNumber: 5
    }, this);
}
_c6 = DetailPanel;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "LazyTravelMap");
__turbopack_context__.k.register(_c1, "TravelMap");
__turbopack_context__.k.register(_c2, "CityLabels");
__turbopack_context__.k.register(_c3, "TravelSection");
__turbopack_context__.k.register(_c4, "TravelCover");
__turbopack_context__.k.register(_c5, "TravelThemeItem");
__turbopack_context__.k.register(_c6, "DetailPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/interests.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "artists",
    ()=>artists,
    "interestCategories",
    ()=>interestCategories,
    "interestItems",
    ()=>interestItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$movies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/movies.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/site-config.ts [app-client] (ecmascript)");
;
;
const interestCategories = [
    {
        id: "music",
        label: "音乐"
    },
    {
        id: "artists",
        label: "艺人"
    },
    {
        id: "film",
        label: "影视"
    },
    {
        id: "ai",
        label: "AI"
    }
];
const musicItems = [
    {
        title: "漫长的季节",
        creator: "连麻Swimming / RICHNOMADIC",
        neteaseSongId: 2155975891,
        album: "邻家小丈夫",
        releaseYear: 2024,
        cover: "https://p1.music.126.net/Dg4tY7L441GZfYqqvWvPUw==/109951169590445432.jpg",
        description: "从失眠与社交中的伪装写起，在漫长的季节里寻找前行的意义。"
    },
    {
        title: "下水道蚂蚁",
        creator: "连麻Swimming / JinJiBeWater_隼",
        neteaseSongId: 2006229678,
        album: "真假美猴王",
        releaseYear: 2022,
        cover: "https://p2.music.126.net/ZNxEPHvOXusFZeFQhQ8DPg==/109951168141966141.jpg",
        description: "以匍匐前进的蚂蚁比喻困境中的自己，回望城市生活、说唱梦想与朋友间的相互支撑。"
    },
    {
        title: "没钥匙的锁",
        creator: "KEY.L刘聪 / c0de731",
        neteaseSongId: 1405135261,
        album: "街区故事",
        releaseYear: 2020,
        cover: "https://p2.music.126.net/4pb6Z041lTpUjTs3tE8bOA==/109951167893582411.jpg",
        description: "旧信、出站口与青春往事串起一段分开的回忆，用锁与钥匙的意象写难以放下的关系。"
    },
    {
        title: "DAY1",
        creator: "艾志恒Asen",
        neteaseSongId: 1492864083,
        album: "DAY1",
        releaseYear: 2020,
        cover: "https://p2.music.126.net/3aBXGrdY0P4dJMbzpCbICg==/109951165439123871.jpg",
        description: "写给一路同行的伙伴，围绕信任、背叛与音乐理想展开。"
    },
    {
        title: "不想回家",
        creator: "G.E.M.邓紫棋",
        neteaseSongId: 1970559933,
        album: "启示录",
        releaseYear: 2022,
        cover: "https://p2.music.126.net/5WBF8uSFXhLVjvMOCeqflQ==/109951167859171747.jpg",
        description: "借夜晚的音乐与陪伴暂避孤独，写不愿独处、又害怕太过清醒的情绪。"
    },
    {
        title: "再见（good bye）",
        creator: "G.E.M.邓紫棋",
        neteaseSongId: 36024806,
        album: "新的心跳",
        releaseYear: 2015,
        cover: "https://p2.music.126.net/kVwk6b8Qdya8oDyGDcyAVA==/1364493930777368.jpg",
        description: "从不愿说再见到接受关系终点，用反复变化的告别表达从挽留到释然的过程。"
    },
    {
        title: "Where Did U Go",
        creator: "G.E.M.邓紫棋",
        neteaseSongId: 234064,
        album: "G.E.M.",
        releaseYear: 2008,
        cover: "https://p1.music.126.net/SRSzJNkVegFlCJVc49VvxQ==/109951163069324876.jpg",
        description: "以粤语与英语写下对远方恋人的思念，在反复追问去向的旋律中流露等待与牵挂。"
    },
    {
        title: "时差雨(Purple Rain)",
        creator: "BOBBYNOPEACE",
        neteaseSongId: 3434340340,
        album: "罪冕",
        releaseYear: 2026,
        cover: "https://p2.music.126.net/vdo6DnHm12P0fm6CAbcNsQ==/109951173920123200.jpg",
        description: "以错位的雨季和紫色雨点串起错过、陪伴与逆境中的坚持，词曲均由 BOBBYNOPEACE 创作。"
    },
    {
        title: "很久以后",
        creator: "G.E.M.邓紫棋",
        neteaseSongId: 1412263970,
        album: "摩天动物园",
        releaseYear: 2019,
        cover: "https://p1.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg",
        description: "写一段关系远去后的回望，在时间沉淀中面对遗憾，也慢慢学会放下。"
    },
    {
        title: "普通朋友",
        creator: "陶喆",
        neteaseSongId: 150623,
        album: "I'm OK",
        releaseYear: 1999,
        cover: "https://p1.music.126.net/tMQXBMTy8pGjGggX1j0YNQ==/109951169389595068.jpg",
        description: "围绕朋友与恋人之间的距离展开，写面对坦白后仍无法收回的感情；收录于《I'm OK》。"
    }
].map((song, index)=>({
        ...song,
        id: `music-${String(index + 1).padStart(2, "0")}`,
        category: "music",
        platform: "网易云音乐",
        url: `https://music.163.com/song?id=${song.neteaseSongId}`,
        sourceUrl: `https://music.163.com/song?id=${song.neteaseSongId}`
    }));
const artists = [
    {
        id: "artist-liu-yifei",
        name: "刘亦菲",
        image: "/images/artists/liu-yifei.png",
        imagePosition: "50% 50%",
        personalReason: "",
        role: "演员",
        style: "作品涵盖古装武侠、都市情感与奇幻题材",
        works: [
            "《仙剑奇侠传》",
            "《神雕侠侣》",
            "《梦华录》",
            "《去有风的地方》"
        ],
        description: "曾饰演《仙剑奇侠传》中的赵灵儿、《神雕侠侣》中的小龙女，以及《梦华录》中的赵盼儿，近年的作品还包括《去有风的地方》。"
    },
    {
        id: "artist-deng-ziqi",
        name: "G.E.M. 邓紫棋",
        image: "/images/artists/deng-ziqi-new.jpeg",
        imagePosition: "50% 42%",
        personalReason: "",
        role: "歌手、词曲创作者",
        style: "流行与 R&B，兼具抒情表达和有力量的演唱",
        works: [
            "《泡沫》",
            "《光年之外》",
            "《摩天动物园》",
            "《启示录》"
        ],
        description: "G.E.M. 邓紫棋，华语创作女歌手，极具爆发力的铁肺嗓音。代表作《光年之外》《泡沫》，词曲全能，舞台感染力强劲。"
    },
    {
        id: "artist-liu-cong",
        name: "KEY.L 刘聪",
        image: "/images/artists/liu-cong.png",
        imagePosition: "50% 50%",
        personalReason: "",
        role: "说唱歌手、音乐人",
        style: "将旋律说唱与街区叙事结合，关注生活经历与个人情绪",
        works: [
            "《经济舱》",
            "《Hey Kong》",
            "《没钥匙的锁》"
        ],
        description: "KEY.L 刘聪，长沙说唱团体 C-BLOCK 成员，擅长旋律叙事，代表作《Hey Kong》《没钥匙的锁》，细腻嗓音搭配动人 Hook，打造众多中文说唱金曲。"
    },
    {
        id: "artist-lian-ma",
        name: "连麻 Swimming",
        image: "/images/artists/lian-ma.png",
        imagePosition: "50% 50%",
        personalReason: "",
        role: "说唱歌手、音乐人",
        style: "以说唱记录生活处境，在个人叙事中呈现情绪与思考",
        works: [
            "《漫长的季节》",
            "《下水道蚂蚁》"
        ],
        description: "连麻 Swimming，成都说唱团体五人组成员。嗓音沙哑富有颗粒感，擅长写实叙事，代表作《自立巷》《漫长的季节》，用说唱描摹市井生活与内心挣扎。"
    }
];
const interestItems = [
    ...musicItems,
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$movies$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["movies"].map((movie)=>({
            id: movie.id,
            category: "film",
            title: movie.title,
            creator: movie.cast[0] + "," + movie.cast[1],
            description: movie.description,
            cover: movie.poster,
            platform: movie.platform,
            url: movie.watchUrl,
            sourceUrl: movie.sourceUrl,
            releaseYear: movie.year,
            mediaType: movie.type,
            director: movie.director,
            cast: movie.cast,
            genres: movie.genres
        })),
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$site$2d$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["siteConfig"].currently.map((item, index)=>({
            id: `ai-focus-${index + 1}`,
            category: "ai",
            title: item.label,
            creator: item.detail
        }))
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/movies.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "movies",
    ()=>movies
]);
const movies = [
    {
        id: "film-meet-yourself",
        title: "去有风的地方",
        type: "电视剧",
        year: 2023,
        director: "丁梓光",
        cast: [
            "刘亦菲",
            "李现"
        ],
        genres: [
            "田园",
            "治愈",
            "爱情",
            "剧情"
        ],
        poster: "/images/meet-yourself-poster.png",
        description: "许红豆在经历生活低谷后独自前往云南大理休整，在那里结识了返乡创业的谢之遥，并与当地居民和小院中的伙伴们共同经历生活、重新寻找方向。",
        platform: "爱奇艺",
        watchUrl: "https://www.iq.com/album/%E5%8E%BB%E6%9C%89%E9%A3%8E%E7%9A%84%E5%9C%B0%E6%96%B9-2023-18pio58cgit?lang=zh_cn",
        sourceUrl: "https://www.iq.com/album/%E5%8E%BB%E6%9C%89%E9%A3%8E%E7%9A%84%E5%9C%B0%E6%96%B9-2023-18pio58cgit?lang=zh_cn"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/travel.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

// 旅行记录按真实 adcode 匹配；省略 visited 的旧记录默认已去过。
// 省级与下级记录独立：visited: false 的省份也可登记 areas。
// 统计只计入与地图匹配的唯一行政区，名称仅为无 adcode 的旧省级记录提供回退。
__turbopack_context__.s([
    "countAreas",
    ()=>countAreas,
    "getAreaVisit",
    ()=>getAreaVisit,
    "getVisit",
    ()=>getVisit,
    "getVisitByAdcode",
    ()=>getVisitByAdcode,
    "travelLabels",
    ()=>travelLabels,
    "visits",
    ()=>visits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$travel$2f$province$2d$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/travel/province-index.ts [app-client] (ecmascript)");
const visits = [
    {
        name: "青海省",
        description: "高原、湖泊与雪山交织，辽阔的自然景观让旅途多了几分开阔与宁静。",
        adcode: 630000,
        cover: "/images/travel/青海/青海湖.jpg",
        areas: [
            {
                adcode: 632800,
                description: "戈壁、盐湖与雪山铺展开辽阔的高原景观，视野所及常有天地相接的开阔感。",
                cover: "/images/travel/青海/海西.jpg"
            },
            {
                adcode: 630100,
                description: "高原城市的日常与多元文化交汇，是认识青海风土的一处起点。",
                cover: "/images/travel/青海/西宁.jpg"
            },
            {
                adcode: 632500,
                description: "草原、河谷与湖泊相连，风景开阔，也保留着浓郁的高原气息。",
                cover: "/images/travel/青海/海南.jpg"
            },
            {
                adcode: 630200,
                description: "黄河谷地与高原地貌相接，既有沿河风景，也有鲜明的地方生活。",
                cover: "/images/travel/青海/海东.jpg"
            },
            {
                adcode: 632200,
                description: "草原、湖泊和远山构成清朗的高原画面，季节变化尤其动人。",
                cover: "/images/travel/青海/海北.jpg"
            }
        ],
        cities: [
            "西宁",
            "海东",
            "海西",
            "海南",
            "海北"
        ]
    },
    {
        name: "甘肃省",
        description: "沿着河西走廊穿行，戈壁、丹霞与丝路遗迹留下鲜明的西北印象。",
        adcode: 620000,
        cover: "/images/travel/甘肃/甘肃.jpg",
        areas: [
            {
                adcode: 620900,
                description: "位于河西走廊西段，戈壁风光与丝路历史共同构成这里的辽阔气质。",
                cover: "/images/travel/甘肃/酒泉.jpg"
            },
            {
                adcode: 620700,
                description: "丹霞地貌色彩鲜明，绿洲与戈壁相邻，是河西走廊上颇具代表性的风景。",
                cover: "/images/travel/甘肃/张掖.jpg"
            }
        ],
        cities: [
            "酒泉",
            "张掖"
        ]
    },
    {
        name: "云南省",
        description: "山川、古城与多元文化相映成趣，每一段路程都有不同的风景与节奏。",
        adcode: 530000,
        cover: "/images/travel/云南/云南.jpg",
        areas: [
            {
                adcode: 530100,
                description: "气候温和、城市节奏舒缓，街巷生活与湖山景致相距不远。",
                cover: "/images/travel/云南/昆明.jpg"
            },
            {
                adcode: 533400,
                description: "雪山、峡谷与藏地风情交织，高原景观带来宁静而辽阔的感受。",
                cover: "/images/travel/云南/迪庆.jpg"
            },
            {
                adcode: 532900,
                description: "苍山洱海之间，古城街巷与湖畔风景构成从容的旅行节奏。",
                cover: "/images/travel/云南/大理.jpg"
            },
            {
                adcode: 530700,
                description: "古城、雪山与纳西文化相互映衬，街巷里总能遇见独特的地方气息。",
                cover: "/images/travel/云南/丽江.jpg"
            },
            {
                adcode: 530400,
                description: "湖泊与山地环绕，城市生活之外也有安静舒展的自然风景。",
                cover: "/images/travel/云南/玉溪.jpg"
            },
            {
                adcode: 532300,
                description: "山地风光与彝族文化相伴，展现出鲜明而多彩的地方特色。",
                cover: "/images/travel/云南/楚雄.jpg"
            }
        ],
        cities: [
            "昆明",
            "大理",
            "丽江",
            "玉溪",
            "迪庆",
            "楚雄"
        ]
    },
    {
        name: "四川省",
        description: "从城市烟火到雪山草原，丰富的地貌让旅行体验层次分明。",
        adcode: 510000,
        cover: "/images/travel/四川/四川.jpg",
        areas: [
            {
                adcode: 510100,
                description: "茶馆、街巷与美食构成悠闲的城市日常，也是一座不断更新的现代都市。",
                cover: "/images/travel/四川/成都.jpg"
            },
            {
                adcode: 512000,
                description: "川中丘陵间的城市，节奏平实，保留着贴近日常的生活气息。",
                cover: "/images/travel/四川/资阳.jpg"
            },
            {
                adcode: 511400,
                description: "东坡文化与川西平原风光相伴，城市里透着温和而闲适的气质。",
                cover: "/images/travel/四川/眉山.jpg"
            },
            {
                adcode: 511100,
                description: "山水与人文景观交汇，既有江河风光，也有深厚的历史底蕴。",
                cover: "/images/travel/四川/乐山.jpg"
            },
            {
                adcode: 510600,
                description: "工业城市气质与川西平原风貌并存，展现出务实而鲜明的城市性格。",
                cover: "/images/travel/四川/德阳.jpg"
            },
            {
                adcode: 510700,
                description: "山水环绕、生活节奏舒适，也以科技与创新氛围闻名。",
                cover: "/images/travel/四川/绵阳.jpg"
            },
            {
                adcode: 513200,
                description: "雪山、草原与峡谷构成壮阔风景，藏羌文化也为旅途增添独特层次。",
                cover: "/images/travel/四川/阿坝.jpg"
            }
        ],
        cities: [
            "成都",
            "资阳",
            "眉山",
            "乐山",
            "德阳",
            "绵阳",
            "阿坝"
        ]
    },
    {
        name: "重庆市",
        description: "山城地形与热闹街巷交织，步行转角间常能遇见不同的城市风景。",
        adcode: 500000,
        cover: "/images/travel/重庆/重庆.jpg",
        areas: [
            {
                adcode: 500101,
                description: "依山临江，长江沿岸的城市风景开阔而有层次。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500102,
                description: "乌江与长江在此交汇，江岸风光和地方生活共同构成城市印象。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500103,
                description: "重庆城市地形与街巷文化的缩影，楼宇、坡道和江景交错出现。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500104,
                description: "保留着工业城市的记忆，也在持续生长出新的城市空间。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500105,
                description: "江岸景观与繁华商圈并行，是观察重庆现代都市面貌的好地方。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500106,
                description: "校园、老街与城市生活交织，既有青春气息，也有浓厚的人文氛围。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500107,
                description: "城市生活丰富多样，街区文化和日常烟火气都很鲜明。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500108,
                description: "隔江眺望渝中半岛，江岸步道与城市天际线相映成景。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500109,
                description: "山水环境清幽，既有城市生活，也保留着从容的自然气息。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500110,
                description: "山地与河谷相伴，城市周边的自然风光质朴而舒展。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500111,
                description: "石刻艺术与历史遗迹闻名，文化景观为旅途留下深刻印象。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500112,
                description: "现代城市发展迅速，交通枢纽与生活街区共同展现重庆的新面貌。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500113,
                description: "山林、温泉与城市生活相邻，适合在繁忙行程中感受自然一面。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500114,
                description: "武陵山区的山水风光与土家族、苗族文化交织，地方特色浓郁。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500115,
                description: "依江而生，湖岸与城市生活相连，整体氛围舒缓宜人。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500116,
                description: "长江沿岸风景悠长，山地与河谷让城市周边多了几分开阔。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500117,
                description: "嘉陵江、渠江与涪江汇流，水岸景观与历史文化相互映衬。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500118,
                description: "城市生活便利，周边自然与人文景点也为短途旅行提供了丰富选择。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500119,
                description: "山地景观突出，森林与高山风光让人感受到重庆的清凉一面。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500120,
                description: "城市环境清新，公园与山水空间让生活节奏显得更加舒适。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500151,
                description: "历史文化与现代城市生活相融，地方民俗也颇具特色。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500152,
                description: "田园风光与涪江水系相伴，展现出安静朴实的川渝乡土气息。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500153,
                description: "传统手工艺与地方饮食文化鲜明，城市风貌亲切而有辨识度。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500154,
                description: "山水环抱，汉丰湖与周边自然景观让城市显得开阔舒展。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500155,
                description: "田园景致与湿地风光相连，节奏平和，适合慢慢感受地方生活。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500156,
                description: "喀斯特地貌雄奇壮观，峡谷、天坑与山林构成极具冲击力的自然风景。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500229,
                description: "地处大巴山腹地，森林与高山风光保留着清静、原生的气息。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500230,
                description: "长江沿岸风景与民俗文化交织，历史传说为城市增添独特记忆。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500231,
                description: "丘陵与平坝相间，城市生活平实，也有舒展的乡野风景。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500233,
                description: "长江穿城而过，江岸风光与三峡地区的历史脉络相连。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500235,
                description: "峡江、山城与历史遗迹相映，沿江风景尤其开阔。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500236,
                description: "瞿塘峡与夔门气势雄浑，山水景观里带着浓厚的诗意与历史感。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500237,
                description: "峡谷与江水构成典型的三峡风光，群山之间层次分明。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500238,
                description: "山地河谷风景清幽，保留着峡谷地区朴素而安静的气息。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500240,
                description: "山地风光与土家族文化并存，民俗和自然景致都很有特色。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500241,
                description: "武陵山区的山水与土苗风情相伴，边城气息鲜明。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500242,
                description: "古镇、山林与土苗文化交织，适合在慢行中感受地方风情。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            },
            {
                adcode: 500243,
                description: "乌江峡谷与民族文化相映，山水景观富有层次。",
                cover: "/images/travel/重庆/重庆各区.jpg"
            }
        ]
    },
    {
        name: "北京市",
        description: "古都底蕴与现代生活并行，历史建筑和城市街区共同构成独特的北京。",
        adcode: 110000,
        cover: "/images/travel/北京/北京.jpg",
        areas: [
            {
                adcode: 110101,
                description: "胡同、城墙与历史街区密集分布，老北京的城市记忆在这里清晰可见。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110102,
                description: "老街巷与城市公共生活交织，传统北京的韵味融入日常。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110105,
                description: "现代都市面貌鲜明，商业、文化与国际化生活汇聚于此。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110106,
                description: "城市街区与历史遗迹相邻，展现出北京多元发展的另一面。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110107,
                description: "工业记忆与山地公园相伴，城市空间里保留着独特的转型气息。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110108,
                description: "校园、科研机构与历史园林交织，文化与创新氛围浓厚。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110109,
                description: "群山环绕，古道与村落散落其间，是北京亲近山野的一处去处。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110111,
                description: "自然山水与历史文化资源丰富，城市之外也有开阔的游览空间。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110112,
                description: "运河文化延续至今，城市建设与水岸空间共同塑造新城风貌。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110113,
                description: "城市生活与近郊田园相连，环境开阔，节奏相对舒展。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110114,
                description: "山水、古迹与新城并存，能看到北京从历史走向现代的多重面貌。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110115,
                description: "城市发展迅速，现代交通与新兴城区构成鲜明的时代感。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110116,
                description: "山林、湖泊与长城景观相伴，是北京北部颇具代表性的自然风景区。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110117,
                description: "山地与田园风光开阔，春秋时节尤其适合感受近郊自然。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110118,
                description: "水库、山林与长城相映，景色清朗，也保留着远离市中心的宁静。",
                cover: "/images/travel/北京/北京各区.jpg"
            },
            {
                adcode: 110119,
                description: "山地、长城与草木风光交织，四季变化带来不同的旅行体验。",
                cover: "/images/travel/北京/北京各区.jpg"
            }
        ]
    },
    {
        name: "天津市",
        description: "海河沿岸与近代建筑勾勒出城市风貌，生活气息里带着鲜明的地方特色。",
        adcode: 120000,
        cover: "/images/travel/天津/天津.jpg",
        areas: [
            {
                adcode: 120101,
                description: "近代建筑与繁华街区相连，是感受天津城市历史与都市生活的窗口。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120102,
                description: "海河沿岸与老城生活交织，保留着天津朴实而鲜活的城市气息。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120103,
                description: "城市公共空间与生活街区相邻，呈现出舒展、宜居的城区面貌。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120104,
                description: "校园、历史遗迹与商业街区并存，人文气息浓厚。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120105,
                description: "海河风景与近代城市记忆相伴，街区里能读到天津发展的痕迹。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120106,
                description: "老街区与运河文化相连，城市历史感和生活气息都很鲜明。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120110,
                description: "城市新区与湿地空间并存，展现天津持续扩展的城市面貌。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120111,
                description: "传统文化与现代城区相融，城市边缘仍保留着亲切的生活节奏。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120112,
                description: "水系与新城建设交错，呈现出天津南部不断发展的城市景观。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120113,
                description: "居住街区与产业空间并行，日常生活氛围平实而便利。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120114,
                description: "连接天津与周边城市，城市发展与近郊生活在此交汇。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120115,
                description: "运河文化与平原风光相伴，城市节奏显得从容安静。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120116,
                description: "海岸线、港口与现代城区共同构成开放而开阔的滨海风景。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120117,
                description: "湿地与水乡风光相连，自然环境为近郊旅程增添清新感。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120118,
                description: "平原田园与城镇生活相伴，呈现出天津西南部质朴的一面。",
                cover: "/images/travel/天津/天津各区.jpg"
            },
            {
                adcode: 120119,
                description: "山川、长城与古村落构成天津少见的山地景观，四季各有风貌。",
                cover: "/images/travel/天津/天津各区.jpg"
            }
        ]
    },
    {
        name: "上海市",
        description: "街区、江岸与摩登天际线并置，城市总能在熟悉与新鲜之间切换。",
        adcode: 310000,
        cover: "/images/travel/上海/上海.jpg",
        areas: [
            {
                adcode: 310101,
                description: "外滩、老街与繁华商业区并置，浓缩了上海的历史与现代气质。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310104,
                description: "梧桐街道、历史建筑与文化空间相映，适合在街区里慢慢漫步。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310105,
                description: "生活街区与城市绿意相融，整体氛围安静而精致。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310106,
                description: "历史街区与现代商业相邻，城市节奏繁忙却层次丰富。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310107,
                description: "苏州河沿岸与老城生活相连，呈现出亲切的日常城市风景。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310109,
                description: "海派文化与近代历史交织，街巷里保留着不少城市记忆。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310110,
                description: "大学校园、滨江空间与工业遗存并存，青春活力与历史感兼具。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310112,
                description: "居住城区与商业空间广阔，是上海日常生活的重要组成部分。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310113,
                description: "滨江工业景观与城市更新相伴，展现上海北部不断变化的面貌。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310114,
                description: "古镇、园林与现代城区交融，历史底蕴为城市增添了沉静气质。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310115,
                description: "从陆家嘴天际线到滨江空间，集中展现上海面向未来的城市形象。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310116,
                description: "海岸、田园与城镇生活相连，呈现出上海较为舒缓的滨海一面。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310117,
                description: "古城文化与山水园林并存，城市之外仍有从容的历史风景。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310118,
                description: "水乡古镇与湖泊湿地相伴，江南水韵在这里格外鲜明。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310120,
                description: "海湾、田园与新城空间并置，适合感受上海南部开阔的一面。",
                cover: "/images/travel/上海/上海各区.jpg"
            },
            {
                adcode: 310151,
                description: "湿地、森林与江海风光交织，是上海难得的生态自然空间。",
                cover: "/images/travel/上海/上海各区.jpg"
            }
        ]
    },
    {
        name: "江苏省",
        description: "水乡、园林与历史名城相连，细腻的人文风景适合慢慢走访。",
        adcode: 320000,
        cover: "/images/travel/江苏/江苏.jpg",
        areas: [
            {
                adcode: 320100,
                description: "古都遗迹、梧桐街道与现代生活相连，城市气质厚重而从容。",
                cover: "/images/travel/江苏/南京.jpg"
            },
            {
                adcode: 320200,
                description: "太湖风光与江南园林相映，水岸景色柔和，生活节奏也很舒展。",
                cover: "/images/travel/江苏/无锡.jpg"
            },
            {
                adcode: 320500,
                description: "园林、古巷与水乡街区相连，细腻的江南风景处处可见。",
                cover: "/images/travel/江苏/苏州.jpg"
            },
            {
                adcode: 320300,
                description: "楚汉文化与现代城市生活交织，历史遗迹为城市增添独特厚度。",
                cover: "/images/travel/江苏/徐州.jpg"
            },
            {
                adcode: 320400,
                description: "运河文化与现代城区相伴，城市生活便利，也保留着江南气息。",
                cover: "/images/travel/江苏/常州.jpg"
            },
            {
                adcode: 321000,
                description: "古运河、园林与老街巷相映，城市风景温润而雅致。",
                cover: "/images/travel/江苏/扬州.jpg"
            }
        ],
        cities: [
            "南京",
            "无锡",
            "苏州",
            "徐州",
            "常州",
            "扬州"
        ]
    },
    {
        name: "山东省",
        description: "山海相依，古城与海滨城市各有气质，旅途可以在历史与海风之间转换。",
        adcode: 370000,
        cover: "/images/travel/山东/山东.jpg",
        areas: [
            {
                adcode: 370100,
                description: "泉水融入城市日常，老街、湖畔与现代城区共同构成独特风景。",
                cover: "/images/travel/山东/济南.jpg"
            },
            {
                adcode: 370200,
                description: "海岸线与红瓦建筑相映，海风、街区和港口气息都很鲜明。",
                cover: "/images/travel/山东/青岛.jpg"
            },
            {
                adcode: 370600,
                description: "沿海风光开阔，山海之间的城市街景显得清爽舒展。",
                cover: "/images/travel/山东/烟台.jpg"
            },
            {
                adcode: 370900,
                description: "泰山雄伟的山势与古城文化相连，登高远望令人印象深刻。",
                cover: "/images/travel/山东/泰安.jpg"
            },
            {
                adcode: 371100,
                description: "海岸线清朗开阔，沙滩与港湾带来轻松的滨海氛围。",
                cover: "/images/travel/山东/日照.jpg"
            },
            {
                adcode: 371000,
                description: "海岸、岛屿与城市街区相伴，海滨生活安静而舒适。",
                cover: "/images/travel/山东/威海.jpg"
            },
            {
                adcode: 370800,
                description: "运河文化与儒家历史相连，城市风貌里沉淀着深厚的人文气息。",
                cover: "/images/travel/山东/济宁.jpg"
            }
        ],
        cities: [
            "济南",
            "青岛",
            "烟台",
            "泰安",
            "日照",
            "威海",
            "济宁"
        ]
    },
    {
        name: "辽宁省",
        description: "山海与工业城市风貌并存，沿海城市展现出爽朗而开阔的一面。",
        adcode: 210000,
        cover: "/images/travel/辽宁/辽宁.jpg",
        areas: [
            {
                adcode: 210200,
                description: "海岸、广场与近代建筑相映，城市气质开阔，带着鲜明的海滨风情。",
                cover: "/images/travel/辽宁/大连.jpg"
            }
        ],
        cities: [
            "大连"
        ]
    },
    {
        name: "湖北省",
        description: "江湖交汇、城市活力充沛，既有厚重历史，也有鲜明的当代气息。",
        adcode: 420000,
        cover: "/images/travel/湖北/湖北.jpg",
        areas: [
            {
                adcode: 420100,
                description: "江湖交汇、街区活力十足，城市烟火气与现代节奏并存。",
                cover: "/images/travel/湖北/武汉.jpg"
            }
        ],
        cities: [
            "武汉"
        ]
    },
    {
        name: "湖南省",
        description: "山水与城市生活相映，街头风味和自然景致都很有辨识度。",
        adcode: 430000,
        cover: "/images/travel/湖南/湖南.jpg",
        areas: [
            {
                adcode: 430100,
                description: "湘江沿岸与热闹街巷相连，美食、文化和年轻活力都很突出。",
                cover: "/images/travel/湖南/长沙.jpg"
            },
            {
                adcode: 430200,
                description: "铁路与工业记忆鲜明，城市发展中也保留着贴近日常的生活气息。",
                cover: "/images/travel/湖南/株洲.jpg"
            }
        ],
        cities: [
            "长沙",
            "株洲"
        ]
    },
    {
        name: "河南省",
        description: "中原历史绵延千年，古都遗迹与当下生活在同一片土地上相遇。",
        adcode: 410000,
        cover: "/images/travel/河南/河南.jpg",
        areas: [
            {
                adcode: 410200,
                description: "古都街巷与宋文化相映，历史遗迹让城市带着浓厚的故事感。",
                cover: "/images/travel/河南/开封.jpg"
            },
            {
                adcode: 410300,
                description: "千年古都底蕴深厚，石窟、古迹与牡丹文化共同构成城市名片。",
                cover: "/images/travel/河南/洛阳.jpg"
            },
            {
                adcode: 410100,
                description: "中原交通枢纽的繁忙与厚重历史并存，是一座不断扩展的现代城市。",
                cover: "/images/travel/河南/郑州.jpg"
            }
        ],
        cities: [
            "开封",
            "洛阳",
            "郑州"
        ]
    },
    {
        name: "江西省",
        description: "山水之间散落着古村、瓷都与历史街区，适合在旅途中放慢脚步。",
        adcode: 360000,
        cover: "/images/travel/江西/江西.jpg",
        areas: [
            {
                adcode: 360100,
                description: "赣江穿城而过，城市历史与现代生活交织，江岸风景开阔。",
                cover: "/images/travel/江西/南昌.jpg"
            },
            {
                adcode: 361100,
                description: "山水与古村资源丰富，周边风景层次多样，适合安排慢节奏旅程。",
                cover: "/images/travel/江西/上饶.jpg"
            },
            {
                adcode: 360500,
                description: "城市紧凑而平实，湖泊与周边自然景观为旅途带来宁静一面。",
                cover: "/images/travel/江西/新余.jpg"
            },
            {
                adcode: 360400,
                description: "长江与庐山相伴，江湖山色交汇，城市风景开阔而清朗。",
                cover: "/images/travel/江西/九江.jpg"
            },
            {
                adcode: 361000,
                description: "文化底蕴深厚，古街与日常生活相融，城市气质温和安静。",
                cover: "/images/travel/江西/抚州.jpg"
            },
            {
                adcode: 360200,
                description: "陶瓷文化贯穿城市生活，窑址、作坊与创意街区各有看点。",
                cover: "/images/travel/江西/景德镇.jpg"
            },
            {
                adcode: 360900,
                description: "山水环境舒展，温泉与田园风光让旅程多了几分闲适。",
                cover: "/images/travel/江西/宜春.jpg"
            },
            {
                adcode: 360600,
                description: "龙虎山丹霞风光与道教文化相映，是一处自然与人文兼具的目的地。",
                cover: "/images/travel/江西/鹰潭.jpg"
            },
            {
                adcode: 360700,
                description: "客家文化与赣南山水相伴，古城街巷里有浓郁的地方特色。",
                cover: "/images/travel/江西/赣州.jpg"
            }
        ],
        cities: [
            "南昌",
            "上饶",
            "新余",
            "九江",
            "抚州",
            "景德镇",
            "宜春",
            "鹰潭",
            "赣州"
        ]
    },
    {
        name: "福建省",
        description: "山海相连，闽南街巷、港口风情与沿海景致共同组成鲜活的地域印象。",
        adcode: 350000,
        cover: "/images/travel/福建/福建.jpg",
        areas: [
            {
                adcode: 350100,
                description: "榕树、老街与闽江风光相伴，城市生活里保留着温润的闽都气息。",
                cover: "/images/travel/福建/福州.jpg"
            },
            {
                adcode: 350200,
                description: "海岛风光与街巷生活相融，海风、骑楼和港口景色令人放松。",
                cover: "/images/travel/福建/厦门.jpg"
            },
            {
                adcode: 350600,
                description: "闽南古厝、老街与沿海风光交织，地方生活气息浓厚。",
                cover: "/images/travel/福建/漳州.jpg"
            },
            {
                adcode: 350500,
                description: "海上丝绸之路的历史遗存遍布街区，多元文化在古城里交汇。",
                cover: "/images/travel/福建/泉州.jpg"
            }
        ],
        cities: [
            "福州",
            "厦门",
            "漳州",
            "泉州"
        ]
    },
    {
        name: "广东省",
        description: "开放、多元而充满活力，传统街区与现代都市在这里并行生长。",
        adcode: 440000,
        cover: "/images/travel/广东/广东.jpg",
        areas: [
            {
                adcode: 440100,
                description: "骑楼街巷、珠江风景与丰富的饮食文化交织，城市生活鲜活而包容。",
                cover: "/images/travel/广东/广州.jpg"
            },
            {
                adcode: 441900,
                description: "制造业城市的效率与丰富的街区生活并存，展现珠三角的活力。",
                cover: "/images/travel/广东/东莞.jpg"
            },
            {
                adcode: 440300,
                description: "现代天际线与多元街区快速生长，城市节奏鲜明，充满创新气息。",
                cover: "/images/travel/广东/深圳.jpg"
            }
        ],
        cities: [
            "广州",
            "东莞",
            "深圳"
        ]
    },
    {
        name: "陕西省",
        description: "古都遗迹与关中风物相伴，厚重的历史感贯穿城市与日常生活。",
        adcode: 610000,
        cover: "/images/travel/陕西/陕西.jpg",
        areas: [
            {
                adcode: 610100,
                description: "古城墙、历史遗址与热闹街区相连，厚重的历史感融入城市日常。",
                cover: "/images/travel/陕西/西安.jpg"
            }
        ],
        cities: [
            "西安"
        ]
    },
    {
        name: "安徽省",
        description: "山水、古村与徽派建筑交织，旅途里常能看到安静而雅致的风景。",
        adcode: 340000,
        cover: "/images/travel/安徽/安徽.jpg",
        areas: [
            {
                adcode: 341000,
                description: "奇松、云海与徽派村落相映，山水与人文风景都令人难忘。",
                cover: "/images/travel/安徽/黄山.jpg"
            },
            {
                adcode: 340100,
                description: "湖泊、公园与现代城区并行，呈现出不断发展的城市活力。",
                cover: "/images/travel/安徽/合肥.jpg"
            }
        ],
        cities: [
            "黄山",
            "合肥"
        ]
    },
    {
        name: "山西省",
        description: "古建与历史遗存保存丰富，穿行其间像是在阅读一段悠长的地方记忆。",
        adcode: 140000,
        cover: "/images/travel/山西/山西.jpg",
        areas: [
            {
                adcode: 140100,
                description: "汾河穿城，古迹与现代生活相邻，是了解山西城市风貌的起点。",
                cover: "/images/travel/山西/太原.jpg"
            },
            {
                adcode: 140200,
                description: "古城格局与石窟艺术闻名，历史遗迹展现出鲜明的北方气质。",
                cover: "/images/travel/山西/大同.jpg"
            },
            {
                adcode: 141000,
                description: "黄河文化与尧都历史相连，城市周边也有丰富的自然与人文景观。",
                cover: "/images/travel/山西/临汾.jpg"
            },
            {
                adcode: 140700,
                description: "古城、院落与晋商文化保存丰富，传统建筑呈现出沉静厚重的美感。",
                cover: "/images/travel/山西/晋中.jpg"
            }
        ],
        cities: [
            "太原",
            "大同",
            "临汾",
            "晋中"
        ]
    },
    {
        name: "浙江省",
        description: "江南水乡与现代城市相连，山水、街巷和日常生活都显得轻巧细致。",
        adcode: 330000,
        cover: "/images/travel/浙江/浙江.jpg",
        areas: [
            {
                adcode: 330100,
                description: "西湖山水与城市生活相映，湖畔、街巷和茶香共同构成温柔的城市印象。",
                cover: "/images/travel/浙江/杭州.jpg"
            },
            {
                adcode: 330700,
                description: "商贸活力汇聚于此，来自各地的人群让城市呈现出开放、多元的面貌。",
                cover: "/images/travel/浙江/义乌.jpg",
                notes: "去过义乌市。"
            },
            {
                adcode: 330600,
                description: "水巷、石桥与古城人文相连，江南风景里带着清晰的历史脉络。",
                cover: "/images/travel/浙江/绍兴.jpg",
                notes: "去过诸暨市。"
            }
        ],
        cities: [
            "杭州",
            "义乌",
            "诸暨"
        ],
        notes: "当前地图按地级市展示，义乌、诸暨分别点亮所属的金华市、绍兴市。"
    },
    {
        name: "香港特别行政区",
        description: "山海、街区与高密度都市景观并置，城市节奏鲜明而多层次。",
        adcode: 810000,
        cover: "/images/travel/香港/香港.jpg",
        areas: [
            {
                adcode: 810001,
                description: "历史建筑、坡道街巷与现代金融区相邻，浓缩了香港的城市变化。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810002,
                description: "传统街市与现代商业并存，街区生活多元而热闹。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810003,
                description: "沿海社区与住宅街区相连，能感受到香港较为日常的一面。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810004,
                description: "海湾、沙滩与山径相伴，在繁忙都市之外留有开阔的自然空间。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810005,
                description: "街道密集、夜色热闹，购物、美食与城市烟火气交织。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810006,
                description: "老街、市场与社区生活交错，保留着亲切而真实的城市日常。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810007,
                description: "多元社区与历史街区相伴，饮食文化尤其丰富。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810008,
                description: "住宅街区与公共绿地并存，日常生活气息浓厚。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810009,
                description: "工业记忆与创意空间相连，城市更新带来新的街区活力。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810010,
                description: "山海与社区街区相邻，商业生活便利，周边风景也很开阔。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810011,
                description: "海岸、山径与新市镇生活并存，呈现出香港西部的舒展面貌。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810012,
                description: "新市镇与乡郊风景交错，能看到香港更贴近田野的一面。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810013,
                description: "边境社区与自然郊野相连，城市之外的空间感更加明显。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810014,
                description: "海湾、湿地与住宅区相伴，生活节奏相对从容。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810015,
                description: "海岸、岛屿与山径景观丰富，是香港亲近海洋与自然的代表区域。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810016,
                description: "河道、公园与新市镇规划相映，城市空间整洁而舒展。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810017,
                description: "货柜码头与屋邨社区相连，工业与城市生活在山海之间交织。",
                cover: "/images/travel/香港/香港各区.jpg"
            },
            {
                adcode: 810018,
                description: "岛屿风光与渔村生活相连，节奏悠缓，适合享受海边时光。",
                cover: "/images/travel/香港/香港各区.jpg"
            }
        ]
    },
    {
        name: "澳门特别行政区",
        description: "中西风格在街巷间交汇，小城尺度里藏着丰富的历史与生活细节。",
        adcode: 820000,
        cover: "/images/travel/澳门/澳门.jpg",
        areas: [
            {
                adcode: 820001,
                description: "住宅街区与传统市集相伴，展现澳门贴近日常生活的一面。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820002,
                description: "老街密集、生活气息浓厚，巷弄里保留着不少城市记忆。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820003,
                description: "街巷安静而富有文化气息，彩色建筑与小型艺术空间颇具特色。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820004,
                description: "历史街区与繁华商业空间相连，是感受澳门多元风貌的核心区域。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820005,
                description: "临海历史街区与城市生活交织，建筑与街巷保留着浓厚的旧城韵味。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820006,
                description: "氹仔旧城区与现代休闲空间相邻，街区尺度亲切，漫步体验舒适。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820007,
                description: "大型度假设施与现代城市景观集中，展现澳门面向当代的一面。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            },
            {
                adcode: 820008,
                description: "远离半岛中心的海岛社区，环境清静，保留着更悠闲的生活节奏。",
                cover: "/images/travel/澳门/澳门各区.jpg"
            }
        ]
    }
];
const travelLabels = {
    title: "旅行足迹",
    subtitle: "点亮走过的地方，记录旅途中的风景。",
    eyebrow: "TRAVEL MAP",
    legendVisited: "已点亮",
    legendUnvisited: "未点亮",
    /** 全国视图的概览文案，{visited} 与 {total} 会被替换成数字 */ progress: "已点亮 {visited} / {total} 个省级行政区",
    /** 省内视图的概览文案，{province} {visited} {total} 会被替换成实际值 */ progressProvince: "{province} · 已点亮 {visited} / {total} 个{unit}",
    hint: "点击省份查看市级地图",
    hintProvince: "点击{unit}查看记录",
    back: "返回全国地图",
    nationalLabel: "全国",
    emptyTitle: "还没有旅行记录",
    emptyBody: "在 src/data/travel.ts 的 visits 里添加省份，地图上就会点亮它。",
    unvisitedBody: "这里还没有旅行记录。",
    unvisitedNoDetail: "已点亮，但还没有补充详细记录。",
    coverPlaceholder: "等待放入旅途影像",
    /** 只有省级记录、还没有市级记录时的提示 */ noAreaRecords: "这个省份已点亮，但还没有登记到具体的{unit}。",
    loadingProvince: "正在加载行政区边界…",
    errorTitle: "地图加载失败",
    errorBody: "省级边界数据没能加载，其他内容不受影响。",
    /** 某个省份缺少下一级数据时的说明 */ areaDataMissing: "缺少下一级行政区数据",
    areaDataMissingBody: "数据源没有提供这个省级单位的下一级边界，因此无法进入市级视图。",
    provinceUnavailable: "这个省份暂时看不了市级地图。",
    visitedAreasSummary: "已登记 {count} 个{unit}",
    noVisitedAreas: "还没有登记{unit}"
};
;
const visitByName = new Map(visits.map((v)=>[
        v.name,
        v
    ]));
const visitByAdcode = new Map(visits.filter((v)=>v.adcode !== undefined).map((v)=>[
        v.adcode,
        v
    ]));
function getVisitByAdcode(adcode, name) {
    const matched = visitByAdcode.get(adcode);
    if (matched) return matched;
    const legacy = name ? visitByName.get(name) : undefined;
    return legacy?.adcode === undefined ? legacy : undefined;
}
function getVisit(name) {
    return visitByName.get(name);
}
function getAreaVisit(visit, adcode) {
    return visit?.areas?.find((a)=>a.adcode === adcode);
}
function countAreas(visit, regionIds) {
    const ids = new Set(visit?.areas?.filter((area)=>area.visited !== false && Number.isInteger(area.adcode) && area.adcode >= 100000 && area.adcode <= 999999 && (!regionIds || regionIds.has(area.adcode))).map((area)=>area.adcode));
    return ids.size;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_144_c2yo_ukww._.js.map
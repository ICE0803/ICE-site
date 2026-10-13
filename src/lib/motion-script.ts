// 首次绘制前执行：决定这一页要不要开启动效。
// 任何异常都保持 data-motion 缺失，此时 CSS 里的动效规则不生效，
// 内容以静态方式完整可见。
export const motionScript = `(function () {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver !== "function") return;
    document.documentElement.setAttribute("data-motion", "on");
  } catch (e) {}
})();`

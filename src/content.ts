(function () {
    const IFRAME_SRC_PART = "annoying-widget"; // FIXME: iframe id

    function hideIframe() {
        const iframes = document.querySelectorAll("iframe");
        for (const f of iframes) {
            const src = f.getAttribute("src") || "";
            if (src.includes(IFRAME_SRC_PART)) {
                f.style.display = "none";
                return true;
            }
        }
        return false;
    }

    if (hideIframe()) return;

    const obs = new MutationObserver(() => {
        if (hideIframe()) obs.disconnect();
    });

    obs.observe(document.documentElement, { childList: true, subtree: true });

    setTimeout(() => obs.disconnect(), 10000);
})();

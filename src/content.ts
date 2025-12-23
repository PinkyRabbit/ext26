function collapseAugustMenu(): void {
    try {
        const mainFrame = document.querySelector("frame")
        const frameset = mainFrame.contentDocument.getElementsByTagName("frameset")[0];
        const framesetRows = frameset.getAttribute("rows");
        const parts = framesetRows.split(",").map(s => s.trim());
        parts[0] = "0";
        frameset.setAttribute("rows", parts.join(","));
    } catch (err) {
        console.log("Error in collapseAugustMenu:");
        console.error(err)
    }
}
(async function () {
    await browser.runtime.sendMessage({ type: "DOMAIN_MATCHED" });

    setTimeout(async () => {
        collapseAugustMenu();
        await browser.runtime.sendMessage({ type: "SCRIPT_COMPLETED" });
    }, 1000);
})();
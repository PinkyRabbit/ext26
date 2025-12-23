function collapseAugustMenu(): void {
    try {
        const mainFrame = document.querySelector("frame")
        const frameset = mainFrame.contentDocument.getElementsByTagName("frameset")[0];
        const framesetRows = frameset.getAttribute("rows");
        const parts = framesetRows.split(",").map(s => s.trim());
        parts[0] = "0";
        frameset.setAttribute("rows", parts.join(","));
        const midFrameset = frameset.querySelector("frameset")
        midFrameset.setAttribute("cols", "*,0");
        const nestedFrames = frameset.querySelectorAll("frame")

        const mainChatFrame = midFrameset.childNodes[0];
        const mainChatBody = mainChatFrame.contentDocument?.querySelector(".board") as HTMLElement | null;
        if (mainChatBody) {
            mainChatBody.style.setProperty("background-color", "#000000", "important");
            mainChatBody.style.setProperty("background-image", "none", "important");
            mainChatBody.style.setProperty("padding", "0 2%", "important");
        }

        const messageFrame = nestedFrames[nestedFrames.length - 1];

        const removeTds = () => {
            const tr = messageFrame.contentDocument.querySelector("tr");
            const tds = Array.from(tr.children).filter(el => el.tagName === "TD");
            if (tds.length === 5) {
                tds.forEach((td, index) => {
                    if (index !== 2 && index !== 3) {
                        td.remove();
                    }
                });
            }

            if (tds.length === 3) {
                tds.forEach((td, index) => {
                    if (!index) {
                        td.remove();
                    }
                    if (index === 1) {
                        const inputs = Array.from(td.getElementsByTagName("input"));
                        const input = inputs[0];
                        input.setAttribute("autocomplete", "off");
                    }
                    if (index === 2) {
                        const buttons = Array.from(td.getElementsByTagName("input"));
                        buttons.forEach((button, i) => {
                            if (i !== 0) button.remove();
                            else button.value = " > "
                        });
                    }
                });
            }
        }
        removeTds();
        messageFrame.addEventListener("load", () => {
            removeTds();
        });
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
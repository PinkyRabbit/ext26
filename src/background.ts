type IconState = "inactive" | "active" | "done";

const ICONS: Record<IconState, Record<number, string>> = {
    inactive: {
        16: "icons/inactive-16.png",
        32: "icons/inactive-32.png",
    },
    active: {
        16: "icons/active-16.png",
        32: "icons/active-32.png",
    },
    done: {
        16: "icons/done-16.png",
        32: "icons/done-32.png",
    },
};

function setIcon(tabId: number, state: IconState) {
    return browser.browserAction.setIcon({
        tabId,
        path: ICONS[state],
    });
}

browser.runtime.onMessage.addListener((msg, sender) => {
    const tabId = sender.tab?.id;
    if (!tabId) return;

    if (msg.type === "DOMAIN_MATCHED") {
        setIcon(tabId, "active");
    }

    if (msg.type === "IFRAME_REMOVED") {
        setIcon(tabId, "done");
    }
});
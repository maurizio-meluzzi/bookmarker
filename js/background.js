browser.browserAction.onClicked.addListener(() => {
    browser.tabs.create({ url: "index_static.html" });
});

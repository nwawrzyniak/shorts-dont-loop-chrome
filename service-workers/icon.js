function updateIcon() {
  chrome.storage.sync.get(["isActive"], function (result) {
    if (result.isActive === undefined) {
      chrome.storage.sync.set({ isActive: true }, function () {
        chrome.action.setIcon({ path: "/graphics/nav_bar.png" });
        console.log("sdl: isActive was undefined, set to true by default.");
      });
    } else {
      if (result.isActive) {
        chrome.action.setIcon({ path: "/graphics/nav_bar.png" });
      } else {
        chrome.action.setIcon({ path: "/graphics/nav_bar_inactive.png" });
      }
    }
  });
}
updateIcon();
chrome.runtime.onInstalled.addListener(updateIcon);
chrome.runtime.onStartup.addListener(updateIcon);

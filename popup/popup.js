function popup() {
  console.info("DOM fully loaded and parsed. Beginning execution of script \"popup.js\".");

  const checkbox = document.querySelector(".sdl-switch input");
  chrome.storage.sync.get(["isActive"], function(result) {
    if (result.isActive === undefined) {
      chrome.storage.sync.set({ isActive: true }, function() {
        checkbox.checked = true;
        console.log("isActive was undefined, set to true by default.");
      });
    } else {
      checkbox.checked = result.isActive;
    }
  });

  checkbox.addEventListener("change", function() {
    chrome.storage.sync.set({ isActive: checkbox.checked }, function() {
      console.log("The value is set to " + checkbox.checked);
    });
      if (checkbox.checked) {
        chrome.action.setIcon({ path: "/graphics/nav_bar.png" });
      } else {
        chrome.action.setIcon({ path: "/graphics/nav_bar_inactive.png" });
      }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", popup);
} else {
  popup();
}

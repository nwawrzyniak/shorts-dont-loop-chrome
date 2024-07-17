function preventLooping() {
  console.info("sdl: DOM fully loaded and parsed. Beginning execution of script \"sdl.js\".");

  chrome.storage.sync.get(["isActive"], function (result) {
    if (result.isActive === undefined) {
      chrome.storage.sync.set({ isActive: true }, function () {
        console.log("sdl: isActive was undefined, set to true by default.");
      });
    }
  });

  chrome.storage.sync.get(["isActive"], function (result) {
    if (result.isActive) {
      let checkVideoInterval = setInterval(function () {
        const video = document.querySelector("#shorts-player > div.html5-video-container > video");
        if (video != null) {
          console.log("sdl: video found.");
          clearInterval(checkVideoInterval);
          let loopCheckInterval = setInterval(function () {
            if (video.loop) {
              video.loop = false;
              console.log("sdl: video.loop set to false.");
            }
          }, 5);
        } else {
          console.log("sdl: video not found, retrying...");
        }
      }, 1000);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", preventLooping);
} else {
  preventLooping();
}

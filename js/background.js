chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.createCapture) {
        chrome.tabs.captureVisibleTab(function (image) {
          console.log(image);
        });
      }
    });
let processing = false;
const port = chrome.runtime.connectNative("ping");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  port.onMessage.addListener((response) => {
    console.log("Received: " + response);
    sendResponse({ value: response });
    processing = false;
  });

  if (processing) return;
  console.log("hostname=" + message.hostname);
  processing = true;
  port.postMessage(message.hostname);

  return true;
});

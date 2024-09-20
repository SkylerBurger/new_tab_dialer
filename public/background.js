chrome.runtime.onMessage.addListener(({event, value}) => {
  if (event === "promptDownload") {
    chrome.downloads.download({
      url: value,
      filename: "dialer-config.json",
    });
  }
});
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    const siteURL = activeTab.url;

    document.getElementById("blocking-domain").textContent = siteURL;
  });
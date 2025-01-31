
const keys = [
  {
    "key": "auto-mode",
    "file": "./modes/auto-mode.js"
  },
  {
    "key": "ask-question",
    "file": "./modes/ask-gpt.js"
  }
];

chrome.commands.onCommand.addListener((command) => {
  keys.map((key) => {
    if (command === key.key) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: [key.file],
        });
      });
    }
  })
});

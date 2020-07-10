let disable = document.getElementById('disable');
chrome.storage.sync.get('edit', function (data) {
  disable.checked = !data.edit;
});

disable.onchange = function (element) {
  let value = this.checked;
  chrome.storage.sync.set({ edit: !value }, function () {
    console.log(value);
  });
  if (!value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'init', edit: value },
        function (_) {}
      );
    });
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { command: 'remove', edit: value },
        function (_) {}
      );
    });
  }
};

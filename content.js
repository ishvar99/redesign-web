var addListeners = function () {
  document.designMode = 'on';
};
var removeListeners = function () {
  document.designMode = 'off';
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.command === 'init') {
    addListeners();
  } else {
    removeListeners();
  }
  sendResponse({ result: 'success' });
});

window.onload = function () {
  chrome.storage.sync.get('edit', function (data) {
    if (data.edit) {
      addListeners();
    } else {
      removeListeners();
    }
  });
};

module.exports = (()  => {

  function capture(callback) {
    chrome.tabs.captureVisibleTab(null, {format: 'png', quality: 100}, callback);
  }

  return {
    capture: capture,
  };
})();

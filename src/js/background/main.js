import Update from './update';
import capture from './capture';

(function () {

  let update = new Update();
  update.init();

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch (request.type) {
        case "capture":
          capture.capture((dataURI) => {
            sendResponse(dataURI);
          });
          break;
      }
      return true;
    }
  );

})();

(function($) {
  'use strict';

  if (!window.parent || parent === self) {
    return;
  }

  var iframeId = parseInt(Math.random() * 99999999);

  try {
    iframeId = (self.frameElement && self.frameElement.getAttribute('data-set-iframe-height_id')) || iframeId;
  } catch (e) {}

  $(window).bind('message', onMessage);

  function postCurrentHeight() {
    postHeight(getDocumentHeight());
  }

  function getDocumentHeight() {
    var D = document;
    return Math.max(D.body.scrollHeight, D.documentElement.scrollHeight);
  }

  function postHeight(height) {
    if (parent.postMessage) {
      parent.postMessage('setIframeHeight::{ "iframeSrc": "'+document.location.href+'", "iframeId": "'+iframeId+'", "iframeReferrer": "'+document.referrer+'", "height":'+height+' }', '*');

      // amp-iframe resize request (https://github.com/ampproject/amphtml/blob/master/extensions/amp-iframe/amp-iframe.md#-amp-iframe)
      parent.postMessage({
        sentinel: 'amp',
        type: 'embed-size',
        height: height
      }, '*');
    }
  }

  function onMessage(e) {
    var data = e.originalEvent.data;
    if (typeof data === 'string' && data.indexOf('::')) {
      var data = data.split('::');
      if (data.length === 2) {
        var params;
        try {
          params = $.parseJSON(data[1])
        } catch (err) { };

        if (params && params !== data[1]) {
          var eventName = data[0];
          switch (eventName) {
            case 'setIframeHeight:deepLink:changed':
              $(window).trigger('setIframeHeight:deepLink:changed', params);
              break;
          }
        }
      }
    }
  }

  setInterval(postCurrentHeight, 350);
  postCurrentHeight();
})(jQuery);

!function(e,r){var t=e.jQuery;if("function"==typeof define&&define.amd)t?define([],r.bind(null,t)):define(["jquery"],r);else if("object"==typeof exports)module.exports=r(t?t:require("jquery"));else{if(!t)throw"Missing required jQuery dependency";e.setIframeHeight=r(t)}}(this,function(e){function r(r){var a=null;return e("iframe").each(function(n,f){var d=e(f),o=d.attr("data-iframeAutoHeight-currentSrc")||f.src;o&&(0===o.indexOf("/")&&(o=i(document.location.href)+o),o===r&&(a=f)),d.data("setIframeHeight_id")||d.data("setIframeHeight_id",t())}),a}function t(){return++o+""}function i(e){var r=e.match(/https?:\/\/.[^/]+/)||[];return r[0]}function a(t,i){var a=r(i.iframeSrc);if(!a&&i.iframeReferrer&&(a=r(i.iframeReferrer)),a){var n=e(a),f=e(window);n.height(i.height),n.attr("data-iframeAutoHeight-currentSrc",i.iframeSrc),iframeId=n.data("setIframeHeight_id");var o=d[iframeId],h=i.height;if(void 0===o?f.trigger("setIframeHeight:determined",i):o>h?f.trigger("setIframeHeight:shrinked",i):h>o&&e(window).trigger("setIframeHeight:enlarged",i),d[iframeId]=h,window.history.replaceState&&n.attr("data-iframeAutoHeight-deepLinkPattern")){var g=n.attr("data-iframeAutoHeight-deepLinkPattern").replace(/%deepLinkIframeSrc%/,encodeURIComponent(i.iframeSrc));document.location.href!==g&&(window.history.replaceState({},"",g),e(window).trigger("setIframeHeight:deepLink:changed",{childUrl:i.iframeSrc,parentUrl:g}))}}}function n(r){var t=r.originalEvent.data;if(t.indexOf("::")){var t=t.split("::");if(2===t.length&&"setIframeHeight"===t[0]){var i=e.parseJSON(t[1]);f.setHeight(i.iframeSrc,i.height,i.iframeReferrer)}}}e(window).bind("setIframeHeight",a).bind("message",n);var f={setHeight:function(r,t,i){t=parseInt(t,10),e(window).trigger("setIframeHeight",[{iframeSrc:r,height:t,iframeReferrer:i}])}},d={},o=0;return f});
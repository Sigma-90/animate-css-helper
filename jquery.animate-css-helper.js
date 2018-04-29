/*
* JQuery Animate.css Helper: 
*   A jQuery plugin to animate selected elements using Daniel Eden's Animate.css library (https://daneden.github.io/animate.css/)
*
* By: Stefan Winkler (https://github.com/Sigma-90 / https://webentwinkler.net)
* Version: 1.2
* Updated: Jan 31st, 2018
*
* Copyright 2018 Stefan Winkler
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*/

// Adding the isNumeric function for older versions of jQuery that do not have it
if(typeof(jQuery.isNumeric) !== "function"){
  jQuery.isNumeric = function(obj){ "use strict"; return !isNaN(parseFloat(obj)) && isFinite(obj); };
}

// Adding the endsWith property to the String type for older versions of ECMAScript
if(typeof String.prototype.endsWith !== "function") {
  /**
   * String.prototype.endsWith
   * Check if given string locate at the end of current string
   * @param {string} substring substring to locate in the current string.
   * @param {number=} position end the endsWith check at that position
   * @return {boolean}
   *
   * @edition ECMA-262 6th Edition, 15.5.4.23
   */
  String.prototype.endsWith = function(substring, position) {
    "use strict";
    substring = String(substring);
    var subLen = substring.length | 0;
    if(!subLen){ return true; }
    var strLen = this.length;
    if(typeof(position) === "undefined"){ position = strLen; }
    else{ position = position | 0; }
    if(position < 1){ return false; }
    var fromIndex = (strLen < position ? strLen : position) - subLen;
    return (fromIndex >= 0 || subLen === -fromIndex) && ( position === 0 || this.charCodeAt(fromIndex) === substring.charCodeAt(0)) && this.indexOf(substring, fromIndex) === fromIndex;
  };
}

jQuery.fn.applyAnimation = function (options) {
    "use strict";

    if (typeof(options) === "string") {
        options = {type: options};
    }
    var settings = jQuery.extend({
        type: "pulse",
        duration: null,
        delay: null,
        loops: null,
        callback: null,
        callback_params: null
    }, options);
    this.each(function () {
      var cleanup_complete = false,
          $el = jQuery(this),
          style = "",
          old_style = !!$el.attr("style") ? $el.attr("style") : "";
      if (settings.duration) {
          if (jQuery.isNumeric(settings.duration) || !settings.duration.endsWith("s")) {
              settings.duration = settings.duration + "s";
          }
          style = style + " " + "-webkit-animation-duration: " + settings.duration + "; animation-duration: " + settings.duration + ";";
      }
      if (settings.delay || settings.delay === 0) {
          if (jQuery.isNumeric(settings.delay) || !settings.delay.endsWith("s")) {
              settings.delay = settings.delay + "s";
          }
          style = style + " " + "-webkit-animation-delay: " + settings.delay + "; animation-delay: " + settings.delay + ";";
      }
      if (settings.loops) {
          style = style + " " + "-webkit-animation-iteration-count: " + settings.loops + "; animation-iteration-count: " + settings.loops + ";";
      }
      if (old_style.length) {
          $el.attr("data-old-style", old_style);
          style = style + " " + old_style;
      }
      $el.attr("data-anim-type", settings.type).attr("style", style).addClass("animated " + settings.type).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
          if(cleanup_complete){ return; }
          var $this = jQuery(this);
          $this.removeClass("animated").removeClass($this.attr("data-anim-type"));
          $this.removeAttr("data-anim-type");
          if (!!$this.attr("data-old-style")) {
              $this.attr("style", $this.attr("data-old-style"));
              $this.removeAttr("data-old-style");
          } else {
              $this.removeAttr("style");
          }
          if (typeof(settings.callback) === "function") {
              if (settings.callback_params) {
                  settings.callback.apply(null, settings.callback_params);
              } else {
                  settings.callback();
              }
          }
          cleanup_complete = true;
      });
    });

    return this;
};
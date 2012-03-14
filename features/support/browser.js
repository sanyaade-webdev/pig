var WebKit = require("webkit-server");

module.exports = function() {
  this.Before("@browser", function(callback) {
    this.browser = new WebKit.Browser(callback);
  });

  this.After("@browser", function(callback) {
    this.browser.stop();
    callback();
  });
};

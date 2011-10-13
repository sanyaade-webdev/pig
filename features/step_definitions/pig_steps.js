var assert = require("assert"),
    HTTP   = require("http"),
    Pig    = require("../../index");

module.exports = function(callback) {
  var Given = When = Then = this.defineStep;

  Given(/^the browser is closed$/, function(next) {
    this.server.close();
    next();
  });

  Given(/^I am using a browser$/, function(next) {
    this.server = HTTP.createServer(function(request, response) {
      response.writeHead(200, { "Content-Type" : "text/html" });
      response.end("<h1>Is JavaScript Enabled?</h1><script>document.write('Yes');</script>");
    });
    this.server.listen(3001, function() {
      this.browser = new Pig.Browser(next);
    }.bind(this));
  });

  When(/^I visit the homepage$/, function(next) {
    this.browser.visit("http://localhost:3001", next);
  });

  Then(/^I should see "([^"]*)"$/, function(text, next) {
    this.browser.source(function(source) {
      assert.notEqual(source.indexOf(text), -1, "Expected there to be content \"" + text + "\" in: " + source);
      next();
    });
  });

  Given(/^standard out is paused$/, function(next) {
    this.browser.server.stdout.pause();
    next();
  });

  When(/^I execute "([^"]*)"$/, function(code, next) {
    this.browser.execute(code, next);
  });

  Then(/^I should see "([^"]*)" when standard out is resumed$/, function(text, next) {
    var
    stdout = this.browser.server.stdout;
    stdout.once("data", function(data) {
      assert.equal(text.trim(), data.toString().trim(), "Expected to see \"" + text + "\" on standard out.");
      next();
    });
    stdout.resume();
  });
};

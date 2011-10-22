var assert = require("assert"),
    HTTP   = require("http"),
    WebKit = require("webkit-server");

module.exports = function() {
  var Server,
      Browser,
      Given = When = Then = this.defineStep;

  Given(/^a server is running$/, function(next) {
    if (Server) {
      return next();
    }

    Server = HTTP.createServer(function(request, response) {
      response.writeHead(200, { "Content-Type" : "text/html" });
      response.end("<h1>Is JavaScript Enabled?</h1><script>document.write('Yes');</script>");
    });
    Server.listen(3001, next);
  });

  Given(/^I am using a browser$/, function(next) {
    if (Browser) {
      return next();
    }

    Browser = new WebKit.Browser(next);
  });

  When(/^I visit the homepage$/, function(next) {
    Browser.visit("http://localhost:3001", next);
  });

  Then(/^I should see "([^"]*)"$/, function(text, next) {
    Browser.source(function(source) {
      assert.notEqual(source.indexOf(text), -1, "Expected there to be content \"" + text + "\" in: " + source);
      next();
    });
  });

  When(/^I pause standard out and execute "([^"]*)"$/, function(code, next) {
    Browser.server.stdout.pause();
    Browser.execute(code, next);
  });

  Then(/^I should see "([^"]*)" when standard out is resumed$/, function(text, next) {
    var
    stdout = Browser.server.stdout;
    stdout.once("data", function(data) {
      assert.equal(text.trim(), data.toString().trim(), "Expected to see \"" + text + "\" on standard out.");
      next();
    });
    stdout.resume();
  });
};

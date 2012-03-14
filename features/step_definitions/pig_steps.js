var assert = require("assert");

module.exports = function() {
  this.When(/^I visit the homepage$/, function(callback) {
    this.browser.visit("http://localhost:" + this.server.address().port, callback);
  });

  this.Then(/^I should see "([^"]*)"$/, function(text, callback) {
    this.browser.source(function(source) {
      assert.notEqual(source.indexOf(text), -1, "Expected there to be content \"" + text + "\" in: " + source);
      callback();
    });
  });

  this.When(/^I pause standard out and execute "([^"]*)"$/, function(code, callback) {
    this.browser.server.stdout.pause();
    this.browser.execute(code, callback);
  });

  this.Then(/^I should see "([^"]*)" when standard out is resumed$/, function(text, callback) {
    var
    stdout = this.browser.server.stdout;
    stdout.once("data", function(data) {
      data = data.toString().trim().split("|").pop();

      assert.equal(text.trim(), data, "Expected to see \"" + text + "\" on standard out.");
      callback();
    });
    stdout.resume();
  });
};

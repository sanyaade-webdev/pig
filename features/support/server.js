var HTTP = require("http");

module.exports = function() {
  this.Before("@server", function(callback) {
    this.server = HTTP.createServer(function(request, response) {
      response.writeHead(200, { "Content-Type" : "text/html" });
      response.end("<h1>Is JavaScript Enabled?</h1><script>document.write('Yes');</script>");
    });
    this.server.listen(0, callback);
  });

  this.After("@server", function(callback) {
    this.server.close();
    callback();
  });
};

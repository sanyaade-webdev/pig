var Events    = require("events"),
    Utilities = require("util");

var STATE_ERROR    = -1,
    STATE_WAITING  = 0,
    STATE_LENGTH   = 1,
    STATE_RESPONSE = 2;

var Parser = function() {
  this.reset();

  Events.EventEmitter.call(this);
};

Utilities.inherits(Parser, Events.EventEmitter);

Parser.prototype.reset = function() {
  this.state          = STATE_WAITING;
  this.response       = null;
  this.bytes_received = 0;
};

Parser.prototype.execute = function(incoming) {
  var position = 0;

  while (position < incoming.length) {
    switch (this.state) {
      case STATE_ERROR:
        throw new Error("Parser error.");
      break;

      case STATE_WAITING:
        if (incoming[position] === 111 && incoming[position + 1] === 107) {
          position += 3;

          this.state = STATE_LENGTH;
        } else {
          this.state = STATE_ERROR;
        }
      break;

      case STATE_LENGTH:
        var length = "";

        while (incoming[position] && incoming[position] !== 10) {
          length   += String.fromCharCode(incoming[position]);
          position += 1;
        }

        length    = parseInt(length, 10);
        position += 1;

        if (length === 0) {
          this.emit("response", new Buffer(0));
          this.reset();
        } else {
          this.state    = STATE_RESPONSE;
          this.response = new Buffer(length);
        }
      break;

      case STATE_RESPONSE:
        var remaining = this.response.length - this.bytes_received;

        if (position + remaining > incoming.length) {
          remaining = incoming.length - position;
        }

        incoming.copy(this.response, this.bytes_received, position, position + remaining);

        position            += remaining;
        this.bytes_received += remaining;

        if (this.bytes_received === this.response.length) {
          this.emit("response", this.response.toString("utf8"));
          this.reset();
        }
      break;
    }
  }
};

module.exports = Parser;

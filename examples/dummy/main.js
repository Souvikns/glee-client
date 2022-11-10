const { EventEmitter } = require("events");

class Events extends EventEmitter {
  _messageFunction;
  constructor() {
    super();
  }

  onMessage(fnc) {
    this._messageFunction = fnc;
  }

  send(message) {
    this._messageFunction(message);
  }
}

async function main() {
  const event = new Events();

  event.onMessage((message) => {
    console.log(message);
  });

  event.send({ channel: "/message", message: "Hello World" });
}

main();

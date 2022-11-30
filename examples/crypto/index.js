const { createAsyncapiClient } = require("glee-browser");
const fs = require("fs");
const path = require("path");

async function main() {
  const client = await createAsyncapiClient(
    fs.readFileSync(path.resolve("./asyncapi.yaml"), "utf-8")
  );

  await client.connect()

  client.onMessage((message) => {
    console.log(message);
  });

  client.send({ channel: "hello", payload: "Hi, Just telling hello" });
}

main();

const { Glee } = require("glee-client");
const fs = require("fs");


async function main() {
  const specString = fs.readFileSync("./asyncapi.yaml", 'utf-8');

  const glee = new Glee(
    specString,
    {}
  );

  glee.connect()
}

main().catch(e => console.log(e))

//@ts-ignore
import { Message } from "@asyncapi/glee";

export default async function ({ glee, connection }) {
  console.log('lifecycle')
  glee.send(new Message({ channel: "/hello", connection, payload: "Hello" }));
}

export const lifecycleEvent = "onServerConnectionOpen";

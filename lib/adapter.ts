import { AsyncAPIDocument } from "@asyncapi/parser";
import { EventEmitter } from "events";
import Glee from "./glee";

export default class Adapter extends EventEmitter {
  constructor(glee: Glee, asyncapi: AsyncAPIDocument) {
    super();
  }

  name(): string {
    throw new Error('Method `name` is not implemented.')
  }
}

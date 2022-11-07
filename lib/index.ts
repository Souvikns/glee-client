import GleeClient from "./glee";
import { FunctionLoader, GleeConfigLoader, SpecLoader } from "./models";

export class Glee {
  constructor(asyncapiSpec: string, functions: any, config: any) {
    const gleeClient = new GleeClient(
      new SpecLoader(asyncapiSpec),
      new FunctionLoader(functions),
      new GleeConfigLoader(config)
    );
  }

  async connect() {}

  async send() {}

  async onMessage() {}
}

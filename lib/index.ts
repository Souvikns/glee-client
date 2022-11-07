import GleeClient from "./glee";
import { FunctionLoader, GleeConfigLoader, SpecLoader } from "./models";

export class Glee {
  private gleeClient: GleeClient
  constructor(asyncapiSpec: string, functions: any, config: any) {
    this.gleeClient = new GleeClient(
      new SpecLoader(asyncapiSpec),
      new FunctionLoader(functions),
      new GleeConfigLoader(config)
    );
  }

  async connect() {
    await this.gleeClient.connect()
  }

  async send() {}

  async onMessage() {}
}

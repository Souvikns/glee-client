import GleeBrowser from "./core/glee";
import { parseAsyncAPISpec } from "./utils";

export default class App {
  private _glee: GleeBrowser;
  constructor(glee: GleeBrowser) {
    this._glee = glee;
  }

  static async create(asyncapiSpec: string, config: any) {
    const parsedAsyncAPI = parseAsyncAPISpec(asyncapiSpec);
    const glee = new GleeBrowser();
    const app = new App(glee);

    return app;
  }
}

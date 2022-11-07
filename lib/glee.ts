import { SpecLoader, FunctionLoader, GleeConfigLoader } from "./models";
import {AsyncAPIDocument} from '@asyncapi/parser'

export default class GleeClient {
  private _adapters = []
  constructor(
    private asyncapi: SpecLoader,
    private functions: FunctionLoader,
    private config: GleeConfigLoader
  ) {

  }

  async connect(){
    const asyncapiSpec = await this.asyncapi.getParserAsyncAPISpec()
  }

  addAdapter(adapter: any, {serverName, parserAsyncAPI}: {serverName: string, parserAsyncAPI: AsyncAPIDocument}) {
    this._adapters.push()
  }


}

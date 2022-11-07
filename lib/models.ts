import { IGleeFunctions } from "./types";
import {parse} from '@asyncapi/parser';

export class SpecLoader {
  private _spec: string
  constructor(spec: string) {
    this._spec = spec
  }

  async getParserAsyncAPISpec() {
    return parse(this._spec)
  }

}

export class FunctionLoader {
  constructor(functions: IGleeFunctions) {}
}

export class GleeConfigLoader {
  constructor(config: any) {}
}

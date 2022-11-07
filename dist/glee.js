"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GleeClient {
    constructor(asyncapi, functions, config) {
        this.asyncapi = asyncapi;
        this.functions = functions;
        this.config = config;
        this._adapters = [];
    }
    async connect() {
        const asyncapiSpec = await this.asyncapi.getParserAsyncAPISpec();
    }
    addAdapter(adapter, { serverName, parserAsyncAPI }) {
        this._adapters.push();
    }
}
exports.default = GleeClient;

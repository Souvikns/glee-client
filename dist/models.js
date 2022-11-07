"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GleeConfigLoader = exports.FunctionLoader = exports.SpecLoader = void 0;
const parser_1 = require("@asyncapi/parser");
class SpecLoader {
    constructor(spec) {
        this._spec = spec;
    }
    async getParserAsyncAPISpec() {
        return (0, parser_1.parse)(this._spec);
    }
}
exports.SpecLoader = SpecLoader;
class FunctionLoader {
    constructor(functions) { }
}
exports.FunctionLoader = FunctionLoader;
class GleeConfigLoader {
    constructor(config) { }
}
exports.GleeConfigLoader = GleeConfigLoader;

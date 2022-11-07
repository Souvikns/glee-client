"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Glee = void 0;
const glee_1 = __importDefault(require("./glee"));
const models_1 = require("./models");
class Glee {
    constructor(asyncapiSpec, functions, config) {
        const gleeClient = new glee_1.default(new models_1.SpecLoader(asyncapiSpec), new models_1.FunctionLoader(functions), new models_1.GleeConfigLoader(config));
    }
    async connect() { }
    async send() { }
    async onMessage() { }
}
exports.Glee = Glee;

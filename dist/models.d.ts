/// <reference types="@asyncapi/parser" />
import { IGleeFunctions } from "./types";
export declare class SpecLoader {
    private _spec;
    constructor(spec: string);
    getParserAsyncAPISpec(): Promise<import("@asyncapi/parser").AsyncAPIDocument>;
}
export declare class FunctionLoader {
    constructor(functions: IGleeFunctions);
}
export declare class GleeConfigLoader {
    constructor(config: any);
}

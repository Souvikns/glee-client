import { SpecLoader, FunctionLoader, GleeConfigLoader } from "./models";
import { AsyncAPIDocument } from '@asyncapi/parser';
export default class GleeClient {
    private asyncapi;
    private functions;
    private config;
    private _adapters;
    constructor(asyncapi: SpecLoader, functions: FunctionLoader, config: GleeConfigLoader);
    connect(): Promise<void>;
    addAdapter(adapter: any, { serverName, parserAsyncAPI }: {
        serverName: string;
        parserAsyncAPI: AsyncAPIDocument;
    }): void;
}

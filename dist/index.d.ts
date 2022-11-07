export declare class Glee {
    constructor(asyncapiSpec: string, functions: any, config: any);
    connect(): Promise<void>;
    send(): Promise<void>;
    onMessage(): Promise<void>;
}

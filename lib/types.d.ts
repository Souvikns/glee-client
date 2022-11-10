
export interface IGleeFunctions {
    [name: string]: Function
}

export interface IGleeMessageObject {
    channel: string
    message: any
}

export type IGleeOnMessageFunction = (message: IGleeMessageObject) => void
import { AsyncAPIDocument, Server } from "@asyncapi/parser";
import WsAdapter from "./adapters/ws";
import Glee from "./glee";


export default async (glee: Glee, parsedAsyncAPI: AsyncAPIDocument) => {
    const serverNames = parsedAsyncAPI.serverNames()

    serverNames.forEach(serverName => {
        const server = parsedAsyncAPI.server(serverName)

        if(server) {
            registerAdapterForServer(serverName, server, glee, parsedAsyncAPI)
        }
    })
}

function registerAdapterForServer(serverName: string, server: Server, glee:Glee, parsedAsyncAPI: AsyncAPIDocument) {
    const protocol = server.protocol()

    if (['ws', 'wss'].includes(protocol)) {
        glee.addAdapter(WsAdapter, {
            serverName,
            server,
            parsedAsyncAPI
        })
    }
}
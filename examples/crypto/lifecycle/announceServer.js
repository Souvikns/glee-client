export default async function(){
    return {
        send: [{
            server: 'websocket', 
            channel: "/hello",
            payload: "server connected"
        }]
    }
}

export const lifecycleEvent = 'onConnect'
export const servers = ['websocket']
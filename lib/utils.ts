import { AsyncAPIDocument, parse } from '@asyncapi/parser'
import Glee from './glee'

export const parseAsyncAPISpec = async (
  spec: string
): Promise<{ parsedSpec?: AsyncAPIDocument; error?: Error }> => {
  try {
    const parsedSpec = await parse(spec)
    return { parsedSpec }
  } catch (error) {
    return { error }
  }
}

export const createChannelRegistry = async (
  glee: Glee,
  parsedAsyncAPI: AsyncAPIDocument
) => {
  const registry = []
  const channelNames = parsedAsyncAPI.channelNames()
  for (const channelName of channelNames) {
    const channel = parsedAsyncAPI.channel(channelName)
    if (channel.servers().length === 0) {
      registry.push({
        channelName,
        adapters: glee.adapter,
      })
    } else {
      registry.push({
        channelName,
        adapters: glee.adapter.filter((a) =>
          channel.servers().includes(a.serverName)
        ),
      })
    }
  }
}

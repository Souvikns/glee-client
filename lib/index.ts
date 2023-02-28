import AsyncAPIClient from './app'
import Glee from './glee'
import { createChannelRegistry, parseAsyncAPISpec } from './utils'
import registerAdapter from './registerAdapter'

export default async function asyncAPIClient(
  asyncapiSpec: string,
  config?: any
) {
  const { parsedSpec, error } = await parseAsyncAPISpec(asyncapiSpec)
  if (error) {
    throw error
  }
  const glee = new Glee()
  await registerAdapter(glee, parsedSpec)
  await glee.connect()

  const client = new AsyncAPIClient(glee)


  return client
}
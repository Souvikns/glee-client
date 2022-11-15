import GleeClient from "./app";
import { parseAsyncAPISpec } from "./utils";
import Glee from "./glee";

export default async function app(
  spec: string,
  config: any
): Promise<GleeClient> {
  const { parsedSpec, error } = await parseAsyncAPISpec(spec);

  if (error) {
    throw error;
  }

  const glee = new Glee();
  const gleeClient = new GleeClient(parsedSpec, glee);
  await gleeClient.connect();

  return gleeClient;
}

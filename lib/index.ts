import App from "./app";
import { parseAsyncAPISpec } from "./utils";

export async function Glee(spec: string, config: any): Promise<App> {
  const { parsedSpec, error } = await parseAsyncAPISpec(spec);

  if (error) {
    throw error;
  }

  const app = new App(parsedSpec)
  await app.registerAdapters()

  return app
}

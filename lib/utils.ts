import { AsyncAPIDocument, parse } from "@asyncapi/parser";

export const parseAsyncAPISpec = async (
  spec: string
): Promise<{ parsedSpec?: AsyncAPIDocument; error?: Error }> => {
  try {
    const parsedSpec = await parse(spec);
    return { parsedSpec };
  } catch (error) {
    return { error };
  }
};

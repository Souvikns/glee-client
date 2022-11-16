import { createGleeClient } from "glee-client";
import asyncapi from "./asyncapi.yaml";

const gleeClient = createGleeClient(asyncapi);

export const NewsHandler = gleeClient.handler('newsOperation');
export const userSignedupHandler = gleeClient.handler("userSignedupOperation");

export default gleeClient;

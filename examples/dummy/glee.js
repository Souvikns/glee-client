import { createGleeClient } from "glee-client";
import asyncapi from "./asyncapi.yaml";

const gleeClient = createGleeClient(asyncapi);

export const NewsHandler = gleeClient.handler("/news");
export const userSignedupHandler = gleeClient.handler("/userSignup");

export default gleeClient;

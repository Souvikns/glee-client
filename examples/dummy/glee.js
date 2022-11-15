import { createGleeClient } from "glee-client";
import asyncapi from "./spec";

const gleeClient = createGleeClient(asyncapi);

export const NewsHandler = gleeClient.handler("/news");
export const userSignedupHandler = gleeClient.handler("/userSignup");

export default gleeClient;

import fetch from 'node-fetch';
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const projectKey = process.env.CTP_PROJECT_KEY as string;
const scopes = [process.env.CTP_SCOPES] as string[];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL as string,
  projectKey: projectKey,
  credentials: {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.CTP_AUTH_URL as string,
  fetch,
};

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

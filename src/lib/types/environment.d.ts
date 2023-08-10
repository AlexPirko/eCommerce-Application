export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CTP_PROJECT_KEY: string;
      CTP_CLIENT_SECRET: string;
      CTP_CLIENT_ID: string;
      CTP_AUTH_URL: string;
      CTP_API_URL: string;
      CTP_SCOPES: string;
    }
  }
}

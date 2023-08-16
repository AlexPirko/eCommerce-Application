import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  TokenCache,
} from '@commercetools/sdk-client-v2';
import { ctpParams } from './client-credemtials';

export default class CtpClientBuilder {
  private _httpMiddlewareOptions: HttpMiddlewareOptions;
  constructor() {
    this._httpMiddlewareOptions = { host: ctpParams.CTP_API_URL, fetch };
  }

  public createCtpClient(email: string | null, password: string | null, currentTokenCache: TokenCache): Client {
    let ctpClient: Client;
    const refreshToken: string | undefined = currentTokenCache.get().refreshToken;

    if (email && password) {
      ctpClient = this.getCtpClientWithPasswordFlow(email, password, currentTokenCache);
    } else if (refreshToken) {
      ctpClient = this.getCtpClientWithRefrehToken(refreshToken, currentTokenCache);
    } else {
      ctpClient = this.getCtpClientWithCredentialsFlow(currentTokenCache);
    }
    return ctpClient;
  }

  private getCtpClientWithCredentialsFlow(currentTokenCache: TokenCache): Client {
    console.log('withClientCredentials scope:\n');

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: ctpParams.CTP_AUTH_URL,
      projectKey: ctpParams.CTP_PROJECT_KEY,
      credentials: {
        clientId: ctpParams.CTP_CLIENT_ID,
        clientSecret: ctpParams.CTP_CLIENT_SECRET,
      },
      tokenCache: currentTokenCache,
      scopes: [ctpParams.CTP_SCOPES],
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(ctpParams.CTP_PROJECT_KEY)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }

  private getCtpClientWithRefrehToken(refreshToken: string, currentTokenCache: TokenCache): Client {
    console.log('withRefrehToken scope:\n');

    const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
      host: ctpParams.CTP_AUTH_URL,
      projectKey: ctpParams.CTP_PROJECT_KEY,
      credentials: {
        clientId: ctpParams.CTP_CLIENT_ID,
        clientSecret: ctpParams.CTP_CLIENT_SECRET,
      },
      tokenCache: currentTokenCache,
      refreshToken: refreshToken,
      fetch,
    };

    const ctpClient: Client = new ClientBuilder()
      .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }

  private getCtpClientWithPasswordFlow(
    customerEmail: string,
    customerPassword: string,
    tokenCache: TokenCache
  ): Client {
    console.log('withPasswordFlow scope:\n');

    const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
      host: ctpParams.CTP_AUTH_URL,
      projectKey: ctpParams.CTP_PROJECT_KEY,
      credentials: {
        clientId: ctpParams.CTP_CLIENT_ID,
        clientSecret: ctpParams.CTP_CLIENT_SECRET,
        user: {
          username: customerEmail,
          password: customerPassword,
        },
      },
      tokenCache: tokenCache,
      scopes: [ctpParams.CTP_SCOPES],
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(ctpParams.CTP_PROJECT_KEY)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }

  private getCtpClientWithAnonymousFlow(): Client {
    console.log('withAnonymousFlow scope:\n');

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: ctpParams.CTP_AUTH_URL,
      projectKey: ctpParams.CTP_PROJECT_KEY,
      credentials: {
        clientId: ctpParams.CTP_CLIENT_ID,
        clientSecret: ctpParams.CTP_CLIENT_SECRET,
        anonymousId: 'set-123',
      },
      scopes: [ctpParams.CTP_SCOPES],
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(ctpParams.CTP_PROJECT_KEY)
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(this._httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }
}

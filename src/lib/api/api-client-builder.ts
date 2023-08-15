import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ctpParams } from './client-credemtials';

export default class CtpClientBuilder {
  private static _ctpClient: Client | null;
  constructor() {}

  public createCtpClient(email: string | null, password: string | null): Client {
    let ctpClient: Client;
    const refreshToken: string | null = localStorage.getItem('refreshToken');

    if (email && password) {
      ctpClient = this.getCtpClientWithPasswordFlow(email, password);
    } else if (refreshToken) {
      ctpClient = this.getCtpClientWithRefrehToken(refreshToken);
    } else {
      ctpClient = this.getCtpClientWithCredentialsFlow();
    }
    console.log(ctpClient);
    return ctpClient;
  }

  private getCtpClientWithCredentialsFlow(): Client {
    console.log('withClientCredentials scope:\n');

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: ctpParams.CTP_AUTH_URL,
      projectKey: ctpParams.CTP_PROJECT_KEY,
      credentials: {
        clientId: ctpParams.CTP_CLIENT_ID,
        clientSecret: ctpParams.CTP_CLIENT_SECRET,
      },
      scopes: [ctpParams.CTP_SCOPES],
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: ctpParams.CTP_API_URL,
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(ctpParams.CTP_PROJECT_KEY)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }

  private getCtpClientWithRefrehToken(refreshToken: string): Client {
    console.log('withRefrehToken scope:\n');

    const refreshAuthMiddlewareOptions: RefreshAuthMiddlewareOptions = {
      host: ctpParams.CTP_AUTH_URL,
      projectKey: ctpParams.CTP_PROJECT_KEY,
      credentials: {
        clientId: ctpParams.CTP_CLIENT_ID,
        clientSecret: ctpParams.CTP_CLIENT_SECRET,
      },
      refreshToken: refreshToken,
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: ctpParams.CTP_API_URL,
      fetch,
    };

    const ctpClient: Client = new ClientBuilder()
      .withRefreshTokenFlow(refreshAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }

  private getCtpClientWithPasswordFlow(customerEmail: string, customerPassword: string): Client {
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
      scopes: [ctpParams.CTP_SCOPES],
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: ctpParams.CTP_API_URL,
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(ctpParams.CTP_PROJECT_KEY)
      .withPasswordFlow(passwordAuthMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
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

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: ctpParams.CTP_API_URL,
      fetch,
    };

    const ctpClient = new ClientBuilder()
      .withProjectKey(ctpParams.CTP_PROJECT_KEY)
      .withAnonymousSessionFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }
}

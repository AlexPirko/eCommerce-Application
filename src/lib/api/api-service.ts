import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Client, TokenCache, TokenInfo } from '@commercetools/sdk-client-v2';
import {
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerSignInResult,
  ProductPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import CtpClientBuilder from './api-client-builder';
import { ctpParams } from './client-credemtials';
import { generateAnonymousId } from '@lib/utils/create-random-id';
import { setUserToken } from '@lib/utils/set-user-token';
import ClientTokenCache from './token-cache';

export default class ApiServices {
  private static _instance: ApiServices;
  private _ctpClient: Client;
  private _apiRoot: ByProjectKeyRequestBuilder;
  private _tokenCache: TokenCache;

  constructor() {
    this._tokenCache = new ClientTokenCache();
    this._ctpClient = new CtpClientBuilder().createCtpClient('', '', this._tokenCache);
    this._apiRoot = createApiBuilderFromCtpClient(this._ctpClient).withProjectKey({
      projectKey: ctpParams.CTP_PROJECT_KEY,
    });
    return ApiServices._instance ?? (ApiServices._instance = this);
  }

  public setNewApiClient(email: string | null = null, password: string | null = null): ApiServices {
    const ctpClientBuilder: CtpClientBuilder = new CtpClientBuilder();
    this._ctpClient = ctpClientBuilder.createCtpClient(email, password, this._tokenCache);
    this._apiRoot = createApiBuilderFromCtpClient(this._ctpClient).withProjectKey({
      projectKey: ctpParams.CTP_PROJECT_KEY,
    });
    return this;
  }

  public async createCustomer(body: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    return this._apiRoot
      .customers()
      .post({
        body,
        headers: {
          Authorization: this._tokenCache.get().token,
          'Content-Type': 'application/json',
        },
      })
      .execute()
      .catch((error) => error);
  }

  public async deleteCustomer(customerId: string, version: string): Promise<Customer> {
    const response: Response = await fetch(
      `https://${ctpParams.CTP_API_URL}ecommerce-app/customers/${customerId}?version=${version}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: this._tokenCache.get().token, // 'Bearer GkmvS6vmloIJQepAGx7amwVbEdzogaAj',
        },
      }
    ).catch((error) => error);

    return response.json();
  }

  public async getCustomer(customerId: string): Promise<Customer> {
    return this._apiRoot
      .customers()
      .withId({ ID: customerId }) //'42ac197d-c4be-4075-a766-158dc7f7c630'
      .get()
      .execute()
      .catch((error) => error);
  }

  public async getCurrentCustomer(): Promise<ClientResponse<Customer>> {
    return this._apiRoot
      .me()
      .get()
      .execute()
      .catch((error) => error);
  }

  public async getProducts(): Promise<ClientResponse<ProductPagedQueryResponse>> {
    return this._apiRoot
      ?.products()
      .get()
      .execute()
      .catch((error) => error);
  }

  public async getCustomerToken(email: string, password: string): Promise<TokenInfo> {
    const projectKey: string = ctpParams.CTP_PROJECT_KEY;
    const response = await fetch(`https://${ctpParams.CTP_AUTH_URL}/oauth/${projectKey}/customers/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${ctpParams.CTP_CLIENT_ID}:${ctpParams.CTP_CLIENT_SECRET}`),
      },
      body: `grant_type=password&username=${email}&password=${password}&scope=view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey} manage_customers:${projectKey}`,
    }).catch((error) => error);
    await setUserToken(response.json());
    return response.json();
  }

  public async getAnonimousToken(): Promise<TokenInfo> {
    const projectKey: string = ctpParams.CTP_PROJECT_KEY;
    const anonymousId = generateAnonymousId();
    const response = await fetch(`https://${ctpParams.CTP_AUTH_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${ctpParams.CTP_CLIENT_ID}:${ctpParams.CTP_CLIENT_SECRET}`),
      },
      body: `grant_type=client_credentials&scope=view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey} manage_customers:${projectKey}&anonymous_id=${anonymousId}`,
    }).catch((error) => error);
    await setUserToken(response.json());
    return response.json();
  }

  public getTokenCache() {
    return this._tokenCache;
  }
}

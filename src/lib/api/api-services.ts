import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Client, TokenCache } from '@commercetools/sdk-client-v2';
import {
  ClientResponse,
  Customer,
  CustomerCreateEmailToken,
  CustomerDraft,
  CustomerSignInResult,
  MyCustomerSignin,
  ProductPagedQueryResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import CtpClientBuilder from './api-client-builder';
import { ctpParams } from './client-credemtials';
import ClientTokenCache from './token-cache';

export default class ApiServices {
  private static _instance: ApiServices;
  private _ctpClient: Client;
  private _apiRoot: ByProjectKeyRequestBuilder;
  private _tokenCache: ClientTokenCache;

  constructor() {
    this._tokenCache = new ClientTokenCache();
    this._ctpClient = new CtpClientBuilder().createCtpClient('', '', this._tokenCache);
    this._apiRoot = createApiBuilderFromCtpClient(this._ctpClient).withProjectKey({
      projectKey: ctpParams.CTP_PROJECT_KEY,
    });
    return ApiServices._instance ?? (ApiServices._instance = this);
  }

  public setApiClient(email: string | null = null, password: string | null = null): ApiServices {
    const ctpClientBuilder: CtpClientBuilder = new CtpClientBuilder();
    this._ctpClient = ctpClientBuilder.createCtpClient(email, password, this._tokenCache);
    this._apiRoot = createApiBuilderFromCtpClient(this._ctpClient).withProjectKey({
      projectKey: ctpParams.CTP_PROJECT_KEY,
    });
    return this;
  }

  public async createCustomer(customerData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    return this._apiRoot
      .customers()
      .post({
        body: customerData,
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
          Authorization: this._tokenCache.get().token,
        },
      }
    ).catch((error) => error);
    return response.json();
  }

  public async getCustomer(customerId: string): Promise<Customer> {
    return this._apiRoot
      .customers()
      .withId({ ID: customerId })
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
      .products()
      .get()
      .execute()
      .catch((error) => error);
  }

  public getTokenCache(): TokenCache {
    return this._tokenCache;
  }

  public async verifyEmail(customerCreateEmailData: CustomerCreateEmailToken): Promise<void> {
    return this._apiRoot
      .customers()
      .emailToken()
      .post({
        body: customerCreateEmailData,
      })
      .execute()
      .catch((error) => error);
  }

  public async customerLogin(customerData: MyCustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
    this.setApiClient(customerData.email, customerData.password);
    const response: ClientResponse<CustomerSignInResult> = await this._apiRoot
      .me()
      .login()
      .post({ body: customerData })
      .execute()
      .catch((er) => er);
    const refreshToken: string | undefined = this.getTokenCache().get().refreshToken;
    localStorage.setItem('refreshToken', `${refreshToken}`);
    return response;
  }
}

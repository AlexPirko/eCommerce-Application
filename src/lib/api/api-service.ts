import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Client } from '@commercetools/sdk-client-v2';
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

export default class ApiServices {
  private static _instance: ApiServices;
  private static _ctpClient: Client;
  private static _apiRoot: ByProjectKeyRequestBuilder;
  private static _token: string;

  private constructor() {}

  public static getInstance() {
    if (!this._instance) {
      this._instance = new ApiServices();
    }
    return this._instance;
  }

  public setNewApiClient(email: string | null = null, password: string | null = null): ApiServices {
    const ctpClientBuilder: CtpClientBuilder = new CtpClientBuilder();
    ApiServices._ctpClient = ctpClientBuilder.createCtpClient(email, password);
    ApiServices._apiRoot = createApiBuilderFromCtpClient(ApiServices._ctpClient).withProjectKey({
      projectKey: 'ecommerce-app',
    });
    console.log(ApiServices._apiRoot);
    console.log(ApiServices._ctpClient);
    return this;
  }

  private setUserToken() {}

  public async createCustomer(body: CustomerDraft): Promise<ClientResponse<CustomerSignInResult> | void> {
    return ApiServices._apiRoot
      .customers()
      .post({
        body,
        headers: {
          Authorization: 'Bearer GkmvS6vmloIJQepAGx7amwVbEdzogaAj',
          'Content-Type': 'application/json',
        },
      })
      .execute()
      .catch(console.log);
  }

  public async deleteCustomer(customerId: string, version: string): Promise<Customer> {
    const response: Response = (await fetch(
      `https://${ctpParams.CTP_API_URL}ecommerce-app/customers/${customerId}?version=${version}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: ApiServices._token, // 'Bearer GkmvS6vmloIJQepAGx7amwVbEdzogaAj',
        },
      }
    ).catch(console.log)) as Response;

    return response.json();
  }

  public getCustommer() {
    console.log(ApiServices._ctpClient);
    console.log(ApiServices._apiRoot);
    return ApiServices._apiRoot
      .customers()
      .withId({ ID: '42ac197d-c4be-4075-a766-158dc7f7c630' })
      .get()
      .execute()
      .catch(console.log);
  }

  public getCurrentCustomer(): Promise<ClientResponse<Customer> | void> {
    console.log(ApiServices._ctpClient);
    console.log(ApiServices._apiRoot);
    return ApiServices._apiRoot.me().get().execute().catch(console.log);
  }

  public getProducts(): Promise<ClientResponse<ProductPagedQueryResponse> | void> {
    console.log(ApiServices._ctpClient);
    console.log(ApiServices._apiRoot);
    return ApiServices._apiRoot.products().get().execute().catch(console.log);
  }

  public async getCustomerToken(email: string, password: string): Promise<Response> {
    const projectKey: string = ctpParams.CTP_PROJECT_KEY;
    const response = (await fetch(`https://${ctpParams.CTP_AUTH_URL}/oauth/${projectKey}/customers/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${ctpParams.CTP_CLIENT_ID}:${ctpParams.CTP_CLIENT_SECRET}`),
      },
      body: `grant_type=password&username=${email}&password=${password}&scope=view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey} manage_customers:${projectKey}`,
    }).catch(console.log)) as Response;
    return response.json();
  }

  public async getAnonimousToken(): Promise<Response> {
    const projectKey: string = ctpParams.CTP_PROJECT_KEY;
    const anonymousId = generateAnonymousId();
    const response = (await fetch(`https://${ctpParams.CTP_AUTH_URL}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${ctpParams.CTP_CLIENT_ID}:${ctpParams.CTP_CLIENT_SECRET}`),
      },
      body: `grant_type=client_credentials&scope=view_published_products:${projectKey} manage_my_orders:${projectKey} manage_my_profile:${projectKey} manage_customers:${projectKey}&anonymous_id=${anonymousId}`,
    }).catch(console.log)) as Response;
    return response.json();
  }
}

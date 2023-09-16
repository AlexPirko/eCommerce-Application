import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { Client, TokenCache } from '@commercetools/sdk-client-v2';
import {
  ClientResponse,
  Customer,
  CustomerCreateEmailToken,
  CustomerDraft,
  CustomerSignInResult,
  CustomerToken,
  MyCustomerSignin,
  ProductPagedQueryResponse,
  ProductProjection,
  createApiBuilderFromCtpClient,
  MyCustomerUpdate,
  CustomerChangePassword,
  SuggestionResult,
  ProductProjectionPagedSearchResponse,
  MyCartDraft,
  Cart,
  MyCartUpdate,
} from '@commercetools/platform-sdk';
import CtpClientBuilder from './api-client-builder';
import { ctpParams } from './client-credentials';
import ClientTokenCache from './token-cache';
import { QueryArgs } from '@lib/types/filter-form-interface';
import { generateAnonymousId } from '@lib/utils/create-random-id';

export default class ApiServices {
  private static _instance: ApiServices;
  private _ctpClient!: Client;
  private _apiRoot!: ByProjectKeyRequestBuilder;
  private _tokenCache!: ClientTokenCache;

  constructor() {
    if (ApiServices._instance) {
      return ApiServices._instance;
    }
    this._tokenCache = new ClientTokenCache();
    this._ctpClient = new CtpClientBuilder().createCtpClient('', '', '', this._tokenCache);
    this._apiRoot = createApiBuilderFromCtpClient(this._ctpClient).withProjectKey({
      projectKey: ctpParams.CTP_PROJECT_KEY,
    });
    ApiServices._instance = this;
  }

  public setApiClient(
    email: string | null = null,
    password: string | null = null,
    anonymousId: string | null
  ): ApiServices {
    const ctpClientBuilder: CtpClientBuilder = new CtpClientBuilder();
    this._ctpClient = ctpClientBuilder.createCtpClient(email, password, anonymousId, this._tokenCache);
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
          'Content-Type': 'application/json',
        },
      })
      .execute()
      .catch((error) => {
        throw error;
      });
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
    ).catch((error) => {
      throw error;
    });
    return response.json();
  }

  public async updateCustomer(customerData: MyCustomerUpdate): Promise<ClientResponse<Customer>> {
    return this._apiRoot
      .me()
      .post({
        body: customerData,
      })
      .execute()
      .catch((er) => er);
  }

  public async getCustomer(customerId: string): Promise<ClientResponse<Customer>> {
    return this._apiRoot
      .customers()
      .withId({ ID: customerId })
      .get()
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public async getCurrentCustomer(): Promise<ClientResponse<Customer>> {
    return this._apiRoot
      .me()
      .get()
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public async getProductsBySearch(
    queryArgs: QueryArgs
  ): Promise<ClientResponse<ProductProjectionPagedSearchResponse>> {
    return this._apiRoot
      .productProjections()
      .search()
      .get({ queryArgs })
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public async getProductsSuggestion(queryArgs: QueryArgs): Promise<ClientResponse<SuggestionResult>> {
    // queryArgs = {
    //   'searchKeywords.en-US':'can', fuzzy:true, staged:true, limit:5
    // }
    return this._apiRoot
      .productProjections()
      .suggest()
      .get({ queryArgs })
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public async getAllProducts(limit: number, offset: number): Promise<ClientResponse<ProductPagedQueryResponse>> {
    return this._apiRoot
      .products()
      .get({
        queryArgs: {
          limit: limit,
          offset: offset,
        },
      })
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public async getProductByKey(key: string): Promise<ClientResponse<ProductProjection>> {
    return this._apiRoot
      .productProjections()
      .withKey({ key })
      .get()
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public getTokenCache(): TokenCache {
    return this._tokenCache;
  }

  public async verifyEmail(customerCreateEmailData: CustomerCreateEmailToken): Promise<ClientResponse<CustomerToken>> {
    return this._apiRoot
      .customers()
      .emailToken()
      .post({
        body: customerCreateEmailData,
      })
      .execute()
      .catch((error) => {
        throw error;
      });
  }

  public async customerLogin(customerData: MyCustomerSignin): Promise<ClientResponse<CustomerSignInResult>> {
    const myCustomerData: MyCustomerSignin = {
      email: customerData.email,
      password: customerData.password,
      activeCartSignInMode: 'MergeWithExistingCustomerCart',
    };
    if (!localStorage.getItem('anonymousId')) {
      this._tokenCache = new ClientTokenCache();
      this.setApiClient(customerData.email, customerData.password, '');
    }

    const response: ClientResponse<CustomerSignInResult> = await this._apiRoot
      .me()
      .login()
      .post({ body: myCustomerData })
      .execute()
      .catch((error) => {
        throw error;
      });

    if (localStorage.getItem('anonymousId')) {
      this._tokenCache = new ClientTokenCache();
      this.setApiClient(customerData.email, customerData.password, '');
      await this._apiRoot
        .me()
        .get()
        .execute()
        .catch((error) => error);
    }
    const refreshToken: string | undefined = this.getTokenCache().get().refreshToken;
    if (refreshToken) localStorage.setItem('refreshToken', `${refreshToken}`);
    return response;
  }

  public customerLogout(): void {
    this._tokenCache = new ClientTokenCache();
    this.setApiClient('', '', '');
  }

  public async changePassword(passwordData: CustomerChangePassword) {
    return this._apiRoot
      .me()
      .password()
      .post({
        body: passwordData,
      })
      .execute()
      .catch((er) => er);
  }

  public async createCart(cartData: MyCartDraft): Promise<ClientResponse<Cart>> {
    const anonymousId: string = generateAnonymousId();
    this._tokenCache = new ClientTokenCache();

    const isLogin: boolean = localStorage.getItem('isLogin') === 'true';
    if (!isLogin) {
      this.setApiClient('', '', anonymousId);
      localStorage.setItem('anonymousId', `${anonymousId}`);
    }

    const response: ClientResponse<Cart> = await this._apiRoot
      .me()
      .carts()
      .post({ body: cartData })
      .execute()
      .catch((error) => {
        throw error;
      });

    const refreshToken: string | undefined = this.getTokenCache().get().refreshToken;
    if (refreshToken) localStorage.setItem('refreshToken', `${refreshToken}`);

    return response;
  }

  public async updateCart(id: string, updateCartData: MyCartUpdate): Promise<ClientResponse<Cart>> {
    const response: ClientResponse<Cart> = await this._apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .post({ body: updateCartData })
      .execute()
      .catch((error) => {
        throw error;
      });
    return response;
  }

  public async getActiveCart(): Promise<ClientResponse<Cart>> {
    const response: ClientResponse<Cart> = await this._apiRoot
      .me()
      .activeCart()
      .get()
      .execute()
      .catch((error) => {
        throw error;
      });
    return response;
  }

  public async deleteCart(id: string, version: number): Promise<ClientResponse<Cart>> {
    const response: ClientResponse<Cart> = await this._apiRoot
      .me()
      .carts()
      .withId({ ID: id })
      .delete({
        queryArgs: {
          version: version,
        },
      })
      .execute()
      .catch((error) => {
        throw error;
      });
    return response;
  }
}

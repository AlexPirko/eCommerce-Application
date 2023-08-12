import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { AuthMiddlewareOptions, Client, ClientBuilder, HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { Customer, CustomerSignInResult, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

export default class ApiServices {
  private static _instance: ApiServices;
  private _ctpClient: Client;
  private _apiRoot: ByProjectKeyRequestBuilder;

  private constructor() {
    this._ctpClient = this.getCtpClient();
    this._apiRoot = this.getApiRoot();
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new ApiServices();
    }
    return this._instance;
  }

  private getCtpClient(): Client {
    const projectKey: string = 'ecommerce-app';
    const scopes: string[] = [
      'manage_my_shopping_lists:ecommerce-app introspect_oauth_tokens:ecommerce-app manage_customer_groups:ecommerce-app manage_my_payments:ecommerce-app manage_project_settings:ecommerce-app manage_standalone_prices:ecommerce-app manage_my_quotes:ecommerce-app view_messages:ecommerce-app manage_shipping_methods:ecommerce-app manage_shopping_lists:ecommerce-app manage_product_selections:ecommerce-app manage_my_orders:ecommerce-app view_published_products:ecommerce-app manage_my_profile:ecommerce-app manage_states:ecommerce-app manage_orders:ecommerce-app manage_my_business_units:ecommerce-app manage_customers:ecommerce-app manage_products:ecommerce-app manage_payments:ecommerce-app manage_order_edits:ecommerce-app manage_my_quote_requests:ecommerce-app manage_types:ecommerce-app manage_attribute_groups:ecommerce-app create_anonymous_token:ecommerce-app manage_api_clients:ecommerce-app manage_audit_log:ecommerce-app manage_categories:ecommerce-app',
    ];
    console.log(scopes);

    const authMiddlewareOptions: AuthMiddlewareOptions = {
      host: 'https://auth.europe-west1.gcp.commercetools.com',
      projectKey: 'ecommerce-app',
      credentials: {
        clientId: '6YE3XydLafUyNq_k96zQZeWi',
        clientSecret: '8W7803UI6jIc-LPS2viA65zXCqX7GSft',
      },
      scopes,
      fetch,
    };

    const httpMiddlewareOptions: HttpMiddlewareOptions = {
      host: 'https://api.europe-west1.gcp.commercetools.com',
      fetch,
    };

    const ctpClient: Client = new ClientBuilder()
      .withProjectKey(projectKey)
      .withClientCredentialsFlow(authMiddlewareOptions)
      .withHttpMiddleware(httpMiddlewareOptions)
      .withLoggerMiddleware()
      .build();

    return ctpClient;
  }

  private getApiRoot(): ByProjectKeyRequestBuilder {
    const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(this._ctpClient).withProjectKey({
      projectKey: 'ecommerce-app',
    });

    return apiRoot;
  }

  public async createCustomer(): Promise<CustomerSignInResult> {
    const response: Response = await fetch('https://api.europe-west1.gcp.commercetools.com/ecommerce-app/customers', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer g2vlBf5IA76_IdLRY2LTH-n2yDrQGeup',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'kirill@example.com',
        firstName: 'Krill',
        lastName: 'Shrimpy',
        password: 'myPassword123',
      }),
    });
    return response.json();
  }

  public async deleteCustomer(id: string, version: string): Promise<Customer> {
    const response: Response = await fetch(
      `https://api.europe-west1.gcp.commercetools.com/ecommerce-app/customers/${id}?version=${version}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer g2vlBf5IA76_IdLRY2LTH-n2yDrQGeup',
        },
      }
    );
    return response.json();
  }
}

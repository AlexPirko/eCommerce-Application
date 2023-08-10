import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  Client,
} from '@commercetools/sdk-client-v2';

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

export const ctpClient: Client = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

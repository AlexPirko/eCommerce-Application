import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ctpClient } from './api-client-builder';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ecommerce-app',
});

console.log(apiRoot);

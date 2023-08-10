import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ctpClient } from './api-client-builder';
import { ClientResponse, ProductPagedQueryResponse, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot: ByProjectKeyRequestBuilder = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ecommerce-app',
});

export const getProject: () => Promise<ClientResponse<ProductPagedQueryResponse>> = (): Promise<
  ClientResponse<ProductPagedQueryResponse>
> => {
  return apiRoot.products().get().execute();
};

getProject()
  .then((res) => console.log(res))
  .catch((er) => console.log(er));

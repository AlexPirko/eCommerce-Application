import { ClientResponse, Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
const _apiServices = new ApiServices();

// Возможно не понадобится, пока нужна для проверки
export async function getProducts(): Promise<Product[]> {
  const result: ClientResponse<ProductPagedQueryResponse> = await _apiServices
    .getAllProducts(500, 1)
    .catch((error) => error);
  return result.body.results;
}

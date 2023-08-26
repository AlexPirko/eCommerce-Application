import { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';

export default class ProductServices {
  private static _instance: ProductServices;
  private api!: ApiServices;

  constructor() {
    if (ProductServices._instance) {
      return ProductServices._instance;
    }
    this.api = new ApiServices();
    ProductServices._instance = this;
  }

  public async getAllProductData(): Promise<ClientResponse<ProductPagedQueryResponse>> {
    return this.api.getAllProducts(30).catch((error) => error);
  }
}

import { ClientResponse, Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams } from '@lib/types/params-interface';
import { getProductResponceAsCardData } from '@lib/utils/get-product-data';

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

  public async getPageProductsData(cardsPerPage: number, pageNumber: number): Promise<CardParams[]> {
    const limit: number = cardsPerPage;
    const offset: number = cardsPerPage * (pageNumber - 1);

    const responce: ClientResponse<ProductPagedQueryResponse> = await this.api
      .getAllProducts(limit, offset)
      .catch((error) => error);

    const results: Product[] = responce.body.results;

    const pageCardParams: CardParams[] = results.map((product) => getProductResponceAsCardData(product));

    return pageCardParams;
  }
}

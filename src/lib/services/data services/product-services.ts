import { ClientResponse, Product, ProductPagedQueryResponse, ProductProjection } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams } from '@lib/types/params-interface';
import { getProductProjectionResponseAsCardData, getProductResponseAsCardData } from '@lib/utils/get-product-data';

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

    const response: ClientResponse<ProductPagedQueryResponse> = await this.api
      .getAllProducts(limit, offset)
      .catch((error) => error);

    const results: Product[] = response.body.results;

    const pageCardParams: CardParams[] = results.map((product) => getProductResponseAsCardData(product));

    return pageCardParams;
  }

  public async getProductByKey(key: string): Promise<CardParams> {
    const response: ClientResponse<ProductProjection> = await this.api.getProductByKey(key).catch((error) => error);

    const cardParams: CardParams = getProductProjectionResponseAsCardData(response.body);
    return cardParams;
  }
}

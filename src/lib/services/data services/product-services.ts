import { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams } from '@lib/types/params-interface';

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

  public async getPageProductsData(cardsPerPage: number, pageNumber: number): Promise<CardParams> {
    const limit: number = cardsPerPage;
    const offset: number = cardsPerPage * (pageNumber - 1);
    const result: ClientResponse<ProductPagedQueryResponse> = await this.api
      .getAllProducts(limit, offset)
      .catch((error) => error);
    const cardParams: CardParams = {
      imgUrls: ['https://w.forfun.com/fetch/f2/f2a3495b197b51b7f19084f6b3ea4c1a.jpeg'],
      productName: 'Nikon 2000',
      productDescription: 'BLA BLA BLA',
      productType: 'Photo Camera',
    };
    console.log(result);
    return cardParams;
  }
}

import './product-list.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import ProductCard from './product-card/product-card';
import ProductServices from '@lib/services/data services/product-services';
import { CardParams } from '@lib/types/params-interface';
import { FIRST_PAGE_NUMBER, PRODUCTS_PER_PAGE } from '@lib/constants/product-list-constants';
import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';

export default class ProductListComponent {
  private _element: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  private _cardsData: CardParams[] | undefined;
  private _api: ApiServices;

  constructor(cardsData?: CardParams[]) {
    this._element = createHTMLElement<HTMLDivElement>('div', ['product-list']);
    this._cardsPerPage = PRODUCTS_PER_PAGE;
    this._pageNumber = FIRST_PAGE_NUMBER;
    this._cardsData = cardsData;
    this._api = new ApiServices();
    this.setProductList();
  }

  private async setProductList(): Promise<void> {
    let cartSku: Record<string, boolean> = {};
    await this._api
      .getActiveCart()
      .then((res: ClientResponse<Cart>): void => {
        cartSku = res.body.lineItems.reduce(
          (acc: Record<string, boolean>, item: LineItem): Record<string, boolean> => {
            const currentSku: string = item.variant.sku as string;
            acc[currentSku] = true;
            return acc;
          },
          {} as Record<string, boolean>
        );
      })
      .catch((error) => error);

    localStorage.removeItem('pageNumber');
    if (!this._cardsData) {
      const productServices: ProductServices = new ProductServices();
      this._cardsData = await productServices
        .getPageProductsData(this._cardsPerPage, this._pageNumber)
        .catch((error) => error);
    }

    if (this._cardsData) {
      this._cardsData.forEach((item: CardParams): void => {
        const productCard: ProductCard = new ProductCard(item, cartSku[item.sku]);
        this._element.append(productCard.element);
      });
    }
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

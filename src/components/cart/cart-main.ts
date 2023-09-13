import template from './cart-main.html';
import './cart-main.scss';

import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams, CartData } from '@lib/types/params-interface';
import createElementFromHtml from '@lib/utils/create-element-from-html';
import { getCartResponseAsCardData } from '@lib/utils/get-product-data';

export default class CartMain {
  private _element: HTMLDivElement;
  private _cartProductData: CardParams[];
  private _cartData: CartData | null;
  private _api: ApiServices;

  constructor() {
    this._element = createElementFromHtml<HTMLDivElement>(template);
    this._api = new ApiServices();
    this._cartProductData = [];
    this._cartData = null;
    this.setGetCartButtonEventHandler();
    this.setDeleteCartButtonEventHandler();
  }

  private setGetCartButtonEventHandler(): void {
    const button: HTMLButtonElement = this._element.querySelector('.button__get-cart') as HTMLButtonElement;
    button.addEventListener('click', async (): Promise<void> => {
      await this._api
        .getActiveCart()
        .then(async (res: ClientResponse<Cart>): Promise<void> => {
          this._cartProductData = res.body.lineItems.map(
            (item: LineItem): CardParams => getCartResponseAsCardData(item)
          );
          this._cartData = {
            totalPrice: res.body.totalPrice.centAmount,
            discountCodes: res.body.discountCodes,
            directDiscount: res.body.directDiscounts,
          };
        })
        .catch((error) => {
          this._cartProductData = [];
          this._cartData = null;
          return error;
        });
      console.log('this._cartDat:');
      console.log(this._cartData);
      console.log('this._cartProductData:');
      console.log(this._cartProductData);
    });
  }

  private setDeleteCartButtonEventHandler(): void {
    const button: HTMLButtonElement = this._element.querySelector('.button__delete-cart') as HTMLButtonElement;
    button.addEventListener('click', async (): Promise<void> => {
      const res: ClientResponse<Cart> = await this._api.getActiveCart().catch((error) => error);
      await this._api.deleteCart(res.body.id, res.body.version).catch((error) => error);
    });
  }
  public get element(): HTMLDivElement {
    return this._element;
  }
}

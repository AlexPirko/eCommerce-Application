import template from './cart-main.html';
import './cart-main.scss';

import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams } from '@lib/types/params-interface';
import createElementFromHtml from '@lib/utils/create-element-from-html';
import { getCartResponseAsCardData } from '@lib/utils/get-product-data';

export default class CartMain {
  private _element: HTMLDivElement;
  private _cartProductData: CardParams[];
  private _api: ApiServices;

  constructor() {
    this._element = createElementFromHtml<HTMLDivElement>(template);
    this._api = new ApiServices();
    this._cartProductData = [];
    this.setGetCartButtonEventHandler();
    this.setDeleteCartButtonEventHandler();
  }

  private setGetCartButtonEventHandler(): void {
    const button: HTMLButtonElement = this._element.querySelector('.button__get-cart') as HTMLButtonElement;
    button.addEventListener('click', async (): Promise<void> => {
      const response: ClientResponse<Cart> = await this._api.getActiveCart().catch((error) => error);
      this._cartProductData = response.body.lineItems.map((item) => getCartResponseAsCardData(item));
      console.log();
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

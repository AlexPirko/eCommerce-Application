import template from './cart-main.html';
import './cart-main.scss';

import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import createElementFromHtml from '@lib/utils/create-element-from-html';

export default class CartMain {
  private _element: HTMLDivElement;
  private _cartData: Cart;
  private _api: ApiServices;

  constructor() {
    this._element = createElementFromHtml<HTMLDivElement>(template);
    this._api = new ApiServices();
    this._cartData = {} as Cart;
    this.setGetCartButtonEventHandler();
  }

  private setGetCartButtonEventHandler() {
    const button: HTMLButtonElement = this._element.querySelector('.button__get-cart') as HTMLButtonElement;
    button.addEventListener('click', async (): Promise<void> => {
      const response: ClientResponse<Cart> = await this._api.getActiveCart().catch((error) => error);
      this._cartData = response.body;
    });
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

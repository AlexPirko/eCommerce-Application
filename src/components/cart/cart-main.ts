import template from './cart-main.html';
import './cart-main.scss';

import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import createElementFromHtml from '@lib/utils/create-element-from-html';

export default class CartMain {
  private _element: HTMLDivElement;

  constructor() {
    this._element = createElementFromHtml<HTMLDivElement>(template);
    this.setGetCartButtonEventHandler();
  }

  private setGetCartButtonEventHandler() {
    const button: HTMLButtonElement = this._element.querySelector('.button__get-cart') as HTMLButtonElement;
    button.addEventListener('click', async (): Promise<void> => {
      const api = new ApiServices();
      const response: ClientResponse<Cart> = await api.getActiveCart();
      console.log(response);
    });
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

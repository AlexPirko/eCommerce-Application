import './cart.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import CartMain from '@components/cart/cart-main';
import ApiServices from '@lib/api/api-services';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import createHTMLElement from '@lib/utils/create-html-element';

export default class MainCart extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['cart-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.getCartData();
  }

  private async getCartData(): Promise<void> {
    const api: ApiServices = new ApiServices();
    await api
      .getActiveCart()
      .then(async (res: ClientResponse<Cart>): Promise<void> => {
        if (res.body.lineItems.length) {
          const emptyCart: HTMLDivElement | null = document.querySelector('.empty-cart__info');
          if (emptyCart) emptyCart.remove();
          const cartMain: CartMain = new CartMain();
          this.viewElementBuilder.addInnerElement(cartMain.element);
        } else {
          const emptyCart: HTMLDivElement = createHTMLElement('div', ['empty-cart__info']);
          emptyCart.innerHTML = `Your shopping cart is empty! You can push <a href='http://${window.location.host}/catalog'>here</a> and buy your own dream:)))`;
          this.viewElementBuilder.addInnerElement(emptyCart);
        }
      })
      .catch((error) => {
        const emptyCart: HTMLDivElement = createHTMLElement('div', ['empty-cart__info']);
        emptyCart.innerHTML = `Your shopping cart is empty! You can push <a href='http://${window.location.host}/catalog'>here</a> and buy your own dream:)))`;
        this.viewElementBuilder.addInnerElement(emptyCart);
        return error;
      });
  }
}

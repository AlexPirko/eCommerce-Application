import './cart.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import CartMain from '@components/cart/cart-main';
import ApiServices from '@lib/api/api-services';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import createHTMLElement from '@lib/utils/create-html-element';
import Router from '@components/router/router';
import { Paths } from '@components/router/paths';

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
    const createEmptyCart = (): void => {
      const emptyCart: HTMLDivElement = createHTMLElement('div', ['empty-cart__info']);
      const button: HTMLButtonElement = createHTMLElement('button', [
        'button__continue',
        'btn',
        'waves-effect',
        'waves-light',
      ]) as HTMLButtonElement;
      const router: Router = new Router(null);

      button.textContent = 'Continue Shopping';
      button.addEventListener('click', (): void => {
        router.navigate(`${Paths.CATALOG}`);
      });
      emptyCart.innerHTML = `<p>Your shopping cart is empty! You can turn to Catalog and buy your own dream:)))</p>`;
      emptyCart.append(button);
      this.viewElementBuilder.addInnerElement(emptyCart);
    };

    const api: ApiServices = new ApiServices();
    api
      .getActiveCart()
      .then(async (res: ClientResponse<Cart>): Promise<void> => {
        if (res.body.lineItems.length) {
          const emptyCart: HTMLDivElement | null = document.querySelector('.empty-cart__info');
          if (emptyCart) emptyCart.remove();
          const cartMain: CartMain = new CartMain();
          this.viewElementBuilder.addInnerElement(cartMain.element);
        } else {
          createEmptyCart();
        }
      })
      .catch((error) => {
        createEmptyCart();
        return error;
      });
  }
}

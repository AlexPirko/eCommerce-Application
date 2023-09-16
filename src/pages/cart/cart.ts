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
    this.configureView();
  }

  private async getCartData(): Promise<void> {
    const mainFooterContainer: HTMLDivElement = createHTMLElement('div', ['empty-cart__info']);
    mainFooterContainer.innerHTML = `Your shopping cart is empty! You can push <a href='http://${window.location.host}/catalog'>here</a> and buy your own dream:)))`;
    this.viewElementBuilder.addInnerElement(mainFooterContainer);
    const api: ApiServices = new ApiServices();
    await api
      .getActiveCart()
      .then(async (res: ClientResponse<Cart>): Promise<void> => {
        mainFooterContainer.remove();
        if (res.body.lineItems.length) {
          const cartMain: CartMain = new CartMain();
          this.viewElementBuilder.addInnerElement(cartMain.element);
        }
      })
      .catch((error) => {
        return error;
      });
  }

  private async configureView(): Promise<void> {}
}

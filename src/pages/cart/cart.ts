import './cart.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import CartMain from '@components/cart/cart-main';

export default class Cart extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['cart-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private async configureView(): Promise<void> {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['cart-title'],
      text: 'Cart',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);
    const cartMain: CartMain = new CartMain();
    this.viewElementBuilder.addInnerElement(titleElementBuilder);
    this.viewElementBuilder.addInnerElement(cartMain.element);
  }
}

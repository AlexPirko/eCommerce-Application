import './cart.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

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
      text: 'cart',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);
    this.viewElementBuilder.addInnerElement(titleElementBuilder);
  }
}

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Catalog extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['catalog-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['catalog-title'],
      text: 'Catalog',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElementBuilder.addInnerElement(titleElementBuilder);
  }
}

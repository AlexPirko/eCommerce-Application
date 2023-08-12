import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class NotFound extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['not-found'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['404-title'],
      text: 'Page not found',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElementBuilder.addInnerElement(titleElementBuilder);
  }
}

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class SignUp extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['signup-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h1',
      classNames: ['signup-title'],
      text: 'Sign Up',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElementBuilder.addInnerElement(titleElementBuilder);
  }
}

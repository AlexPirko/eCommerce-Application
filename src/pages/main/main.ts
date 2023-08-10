import './main.scss';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Main extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'main',
      classNames: ['main'],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h1',
      classNames: ['main-title'],
      text: 'Main',
    };
    const creatorTitle: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElement.addInnerElement(creatorTitle);
  }
}

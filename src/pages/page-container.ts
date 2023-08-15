import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';

export default class PageContainer extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'main',
      classNames: ['page-container'],
    };
    super(params);
  }

  public addCurrentPage(page: ComponentView): void {
    const currentElement: HTMLElement = this.viewElementBuilder.getElement();
    if (currentElement.firstElementChild) {
      currentElement.firstElementChild.remove();
    }
    this.viewElementBuilder.addInnerElement(page.getHtmlElement() as HTMLElement);
  }
}

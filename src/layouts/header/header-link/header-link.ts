import './header-link.scss';
import { Params, PageParams } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';

export default class HeaderLink extends ComponentView {
  linkElements: Map<string, HeaderLink>;

  constructor(pageParams: PageParams, linkElements: Map<string, HeaderLink>) {
    const params: Params = {
      tagName: 'a',
      classNames: ['nav-item'],
      text: pageParams.name,
      callback: pageParams.callback,
    };
    super(params);

    this.linkElements = linkElements;
    this.configureView();
  }

  setSelected() {
    this.linkElements.forEach((linkElement) => linkElement.setDeselected());
    const element: HTMLElement = this.viewElementBuilder.getElement();
    element.classList.add('nav-item__selected');
  }

  setDeselected() {
    const element: HTMLElement = this.viewElementBuilder.getElement();
    element.classList.remove('nav-item__selected');
  }

  configureView() {
    const element = this.viewElementBuilder.getElement();
    element.addEventListener('click', this.setSelected.bind(this));
  }
}

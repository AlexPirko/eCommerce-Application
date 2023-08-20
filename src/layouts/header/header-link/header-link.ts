import './header-link.scss';
import { Params, PageParams } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';

export default class HeaderLink extends ComponentView {
  public readonly linkElements: Map<string, HeaderLink>;

  constructor(pageParams: PageParams, linkElements: Map<string, HeaderLink>) {
    const params: Params = {
      tagName: 'a',
      classNames: ['nav-item', `nav-${pageParams.name.replace(/ /g, '').toLowerCase()}`],
      text: pageParams.name,
      callback: pageParams.callback,
    };
    super(params);

    this.linkElements = linkElements;
    this.configureView();
  }

  public setSelected(): void {
    this.linkElements.forEach((linkElement) => linkElement.setDeselected());
    const element: HTMLElement = this.viewElementBuilder.getElement();
    element.classList.add('nav-item__selected');
  }

  public setDeselected(): void {
    const element: HTMLElement = this.viewElementBuilder.getElement();
    element.classList.remove('nav-item__selected');
  }

  private configureView(): void {
    const element: HTMLElement = this.viewElementBuilder.getElement();
    element.addEventListener('click', this.setSelected.bind(this));

    if (element.className === 'nav-item nav-main') {
      element.innerHTML = '<i class="menu-logo material-icons">camera</i>';
    }
    if (element.className === 'nav-item nav-cart') {
      element.innerHTML = '<i class="menu-cart material-icons">local_grocery_store</i>';
    }
    if (element.className === 'nav-item nav-signup') {
      element.innerHTML = '<a class="waves-effect waves-light btn">Sign Up</a>';
    }
    if (element.className === 'nav-item nav-login') {
      element.innerHTML = '<a class="waves-effect waves-light btn">Log In</a>';
    }
  }
}

import './header.scss';
import createLogo from '@lib/utils/create-logo';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Header extends ComponentView {
  navEl: string = `<div class="nav-wrapper">
          <ul class="left hide-on-med-and-down">
            <li><a href="#!" class="brand-logo"><div class="logo-wrapper">${createLogo()}</div></a></li>
            <li><a href="#">Catalog</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Profile</a></li>
        </ul>
        <ul class="right hide-on-med-and-down">
            <li><a href="#"><i class="material-icons cart">shopping_cart</i></a></li>
            <li><a class="waves-effect waves-light btn-small">Log in</a></li>
            <li><a class="waves-effect waves-light btn-small">Sign up</a></li>
        </ul>
    </div>`;

  constructor() {
    const params: Params = {
      tagName: 'header',
      classNames: ['header'],
    };
    super(params);
    this.configureView();
  }

  private configureView(): void {
    const navParams: Params = {
      tagName: 'nav',
      classNames: ['nav'],
    };
    const creatorNav: ElementBuilder = new ElementBuilder(navParams);

    this.viewElement.addInnerElement(creatorNav);
    const nav = creatorNav.getElement() as HTMLElement;

    nav.innerHTML = this.navEl;
  }
}

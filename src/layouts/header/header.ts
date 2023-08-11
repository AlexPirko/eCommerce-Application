import './header.scss';
// import createLogo from '@lib/utils/create-logo';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import HeaderLink from './header-link/header-link';
// import HeaderLink from './header-link/header-link';

const HeaderTitle = {
  MAIN: 'Main',
  CATALOG: 'Catalog',
  ACCOUNT: 'My Account',
  ABOUT: 'About Us',
  CART: 'Cart',
  SIGNUP: 'Sign Up',
  LOGIN: 'Log In',
};

const START_PAGE_ID = 0;

export default class Header extends ComponentView {
  linkElements: HeaderLink[];

  constructor() {
    const params: Params = {
      tagName: 'header',
      classNames: ['header'],
    };
    super(params);

    this.linkElements = [];
    this.configureView();
  }

  // eslint-disable-next-line max-lines-per-function
  private configureView(): void {
    const navParams: Params = {
      tagName: 'nav',
      classNames: ['nav'],
    };
    const navElementBuilder: ElementBuilder = new ElementBuilder(navParams);
    this.viewElementBuilder.addInnerElement(navElementBuilder);
    const navWrapper = document.createElement('div');
    navWrapper.classList.add('nav-wrapper');
    navElementBuilder.addInnerElement(navWrapper);

    const pages = [
      {
        name: HeaderTitle.MAIN,
        callback: () => {},
      },
      {
        name: HeaderTitle.CATALOG,
        callback: () => {},
      },
      {
        name: HeaderTitle.ACCOUNT,
        callback: () => {},
      },
      {
        name: HeaderTitle.ABOUT,
        callback: () => {},
      },
      {
        name: HeaderTitle.CART,
        callback: () => {},
      },
      {
        name: HeaderTitle.SIGNUP,
        callback: () => {},
      },
      {
        name: HeaderTitle.LOGIN,
        callback: () => {},
      },
    ];

    pages.forEach((page, id) => {
      const linkElement: HeaderLink = new HeaderLink(page.name, this.linkElements);
      navWrapper.append(linkElement.getHtmlElement() as HTMLElement);

      this.linkElements.push(linkElement);
      if (id === START_PAGE_ID) {
        linkElement.setSelected();
      }
    });
  }
}

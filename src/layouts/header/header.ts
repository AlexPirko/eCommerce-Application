import './header.scss';
// import createLogo from '@lib/utils/create-logo';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import HeaderLink from './header-link/header-link';
import PageContainer from '@pages/page-container';
import Main from '@pages/main/main';
import Login from '@pages/login/login';

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

  constructor(container: PageContainer) {
    const params: Params = {
      tagName: 'header',
      classNames: ['header'],
      callback: null,
    };
    super(params);

    this.linkElements = [];
    this.configureView(container);
  }

  // eslint-disable-next-line max-lines-per-function
  private configureView(container: PageContainer): void {
    const navParams: Params = {
      tagName: 'nav',
      classNames: ['nav'],
      callback: null,
    };
    const navElementBuilder: ElementBuilder = new ElementBuilder(navParams);
    this.viewElementBuilder.addInnerElement(navElementBuilder);

    const main: ComponentView = new Main();

    const login: ComponentView = new Login();

    const pages = [
      {
        name: HeaderTitle.MAIN,
        callback: () => container.addCurrentPage(main),
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
        callback: () => container.addCurrentPage(login),
      },
    ];

    pages.forEach((page, id) => {
      const linkElement: HeaderLink = new HeaderLink(page, this.linkElements);
      navElementBuilder.addInnerElement(linkElement.getHtmlElement() as HTMLElement);

      this.linkElements.push(linkElement);
      if (id === START_PAGE_ID) {
        linkElement.setSelected();
      }
    });
  }
}

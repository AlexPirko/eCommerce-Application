import './header.scss';
// import createLogo from '@lib/utils/create-logo';
import { Params, PageParams } from '@lib/types/params-interface';
import { HeaderTitle } from '@lib/types/header-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import HeaderLink from './header-link/header-link';
// import PageContainer from '@pages/page-container';
// import Main from '@pages/main/main';
// import Login from '@pages/login/login';
import Router from '@components/router/router';
// import { Paths } from '@components/router/paths';

const HeaderTitle: HeaderTitle = {
  MAIN: 'Main',
  CATALOG: 'Catalog',
  ACCOUNT: 'My Account',
  ABOUT: 'About Us',
  CART: 'Cart',
  SIGNUP: 'Sign Up',
  LOGIN: 'Log In',
};

export default class Header extends ComponentView {
  headerLinkElements: Map<string, HeaderLink>;

  constructor(router: Router) {
    const params: Params = {
      tagName: 'header',
      classNames: ['header'],
      callback: null,
    };
    super(params);

    this.headerLinkElements = new Map();
    this.configureView(router);
  }

  private configureView(router: Router): void {
    const navParams: Params = {
      tagName: 'nav',
      classNames: ['nav'],
      callback: null,
    };
    const navElementBuilder: ElementBuilder = new ElementBuilder(navParams);
    this.viewElementBuilder.addInnerElement(navElementBuilder);

    Object.keys(HeaderTitle).forEach((key: string) => {
      const linkParams: PageParams = {
        name: HeaderTitle[key as keyof HeaderTitle] as string,
        callback: () =>
          router.navigate((HeaderTitle[key as keyof HeaderTitle] as string).replace(/ /g, '').toLowerCase()),
      };
      const linkElement: HeaderLink = new HeaderLink(linkParams, this.headerLinkElements);
      navElementBuilder.addInnerElement(linkElement.getHtmlElement() as HTMLElement);
      this.headerLinkElements.set(HeaderTitle[key as keyof HeaderTitle] as string, linkElement);
    });
  }

  setSelectedLink(namePage: string) {
    const headerLink = this.headerLinkElements.get(namePage.toUpperCase());
    if (headerLink instanceof HeaderLink) {
      headerLink.setSelected();
    }
  }
}

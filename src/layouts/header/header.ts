import './header.scss';
import createHTMLElement from '@lib/utils/create-html-element';
import { Params, PageParams } from '@lib/types/params-interface';
import { HeaderTitle } from '@lib/types/header-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import HeaderLink from './header-link/header-link';
import Router from '@components/router/router';

const HeaderTitle: HeaderTitle = {
  MAIN: 'Main',
  CATALOG: 'Catalog',
  ABOUT: 'About Us',
  PROFILE: 'Profile',
  CART: 'Cart',
  SIGNUP: 'Sign Up',
  LOGIN: 'Log In',
  LOGOUT: 'Log Out',
};

export default class Header extends ComponentView {
  private headerLinkElements: Map<string, HeaderLink>;

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

  public setSelectedLink(namePage: string): void {
    const headerLink: HeaderLink | undefined = this.headerLinkElements.get(namePage.toUpperCase());
    if (headerLink instanceof HeaderLink) {
      headerLink.setSelected();
    }
  }

  private configureView(router: Router): void {
    const navParams: Params = {
      tagName: 'nav',
      classNames: ['nav'],
      callback: null,
    };
    // const headerContainer: HTMLDivElement = createHTMLElement('div', ['container']);
    const NUM_OF_LEFT_NAV_TITLE = 3;
    const navElementBuilder: ElementBuilder = new ElementBuilder(navParams);
    const leftNavNodeWrapper: HTMLDivElement = createHTMLElement('div', ['left-node__wrapper']);
    const rightNavNodeWrapper: HTMLDivElement = createHTMLElement('div', ['right-node__wrapper']);
    navElementBuilder.addInnerElement(leftNavNodeWrapper);
    navElementBuilder.addInnerElement(rightNavNodeWrapper);

    this.viewElementBuilder.addInnerElement(navElementBuilder);

    Object.keys(HeaderTitle).forEach((key: string, index: number) => {
      const linkParams: PageParams = {
        name: HeaderTitle[key as keyof HeaderTitle] as string,
        callback: () =>
          router.navigate((HeaderTitle[key as keyof HeaderTitle] as string).replace(/ /g, '').toLowerCase()),
      };
      const linkElement: HeaderLink = new HeaderLink(linkParams, this.headerLinkElements);
      if (index < NUM_OF_LEFT_NAV_TITLE) {
        leftNavNodeWrapper.append(linkElement.getHtmlElement() as HTMLElement);
      } else {
        rightNavNodeWrapper.append(linkElement.getHtmlElement() as HTMLElement);
      }

      this.headerLinkElements.set(HeaderTitle[key as keyof HeaderTitle] as string, linkElement);
    });
  }
}

import '@assets/styles/global.scss';
import handleVisibility from '@lib/utils/handle-visibility';
import profileLinkGuard from '@lib/utils/profile-link-guard';
import changeCartCount from '@layouts/header/header-link/header-cart-count';
import { Paths, PRODUCT_SELECTOR } from '@components/router/paths';
import Router from '@components/router/router';
import Header from '@layouts/header/header';
import MainFooter from '@layouts/main-footer/main-footer';
import Footer from '@layouts/footer/footer';
import CreateBurger from '@layouts/header/create-burger/create-burger';
import ApiServices from '@lib/api/api-services';
import ComponentView from '@lib/services/component-view';
import { RouteParams } from '@lib/types/params-interface';
import PageContainer from '@pages/page-container';

export default class App {
  private static container: HTMLElement = document.getElementById('body') as HTMLElement;
  private router: Router;
  private header: Header | null;
  private pageContainer: PageContainer | null;
  private mainFooter: MainFooter | null;
  private footer: Footer | null;
  private _apiServices: ApiServices;
  private burger: CreateBurger;

  constructor() {
    this._apiServices = new ApiServices();
    this.header = null;
    this.pageContainer = null;
    this.mainFooter = null;
    this.footer = null;
    this.burger = new CreateBurger();

    const routes: RouteParams[] = this.createRoutes();
    this.router = new Router(routes);

    this.createView();

    document.addEventListener('DOMContentLoaded', () => {
      handleVisibility();
      changeCartCount();
    });
  }

  private createView(): void {
    this.header = new Header(this.router);
    this.header.getHtmlElement()?.append(this.burger.createBurgerElement());
    this.mainFooter = new MainFooter();
    this.pageContainer = new PageContainer();
    this.footer = new Footer();

    App.container.append(
      this.header.getHtmlElement() as HTMLElement,
      this.pageContainer.getHtmlElement() as HTMLElement,
      this.mainFooter.getHtmlElement() as HTMLElement,
      this.footer.getHtmlElement() as HTMLElement
    );
  }

  private createRoutes(): RouteParams[] {
    return [
      {
        path: ``,
        callback: async () => {
          const { default: Main } = await import('@pages/main/main');
          this.setContent(Paths.MAIN, new Main());
        },
      },
      {
        path: `${Paths.MAIN}`,
        callback: async () => {
          const { default: Main } = await import('@pages/main/main');
          this.setContent(Paths.MAIN, new Main());
        },
      },
      {
        path: `${Paths.CATALOG}`,
        callback: async () => {
          const { default: Catalog } = await import('@pages/catalog/catalog');
          this.setContent(Paths.CATALOG, new Catalog());
        },
      },
      {
        path: `${Paths.CATALOG}/${PRODUCT_SELECTOR}`,
        callback: async (key: string) => {
          const { default: Catalog } = await import('@pages/catalog/catalog');
          this.setContent(Paths.CATALOG, new Catalog(key));
        },
      },
      {
        path: `${Paths.ABOUT}`,
        callback: async () => {
          const { default: About } = await import('@pages/about-us/about-us');
          this.setContent(Paths.ABOUT, new About());
        },
      },
      {
        path: `${Paths.CART}`,
        callback: async () => {
          const { default: MainCart } = await import('@pages/cart/cart');
          this.setContent(Paths.CART, new MainCart());
        },
      },
      {
        path: `${Paths.PROFILE}`,
        callback: async () => {
          const { default: Profile } = await import('@pages/profile/profile');
          this.setContent(Paths.PROFILE, new Profile());
        },
      },
      {
        path: `${Paths.SIGNUP}`,
        callback: async () => {
          const { default: SignUp } = await import('@pages/sign-up/sign-up');
          this.setContent(Paths.SIGNUP, new SignUp());
        },
      },
      {
        path: `${Paths.LOGIN}`,
        callback: async () => {
          const { default: Login } = await import('@pages/login/login');
          this.setContent(Paths.LOGIN, new Login());
        },
      },
      {
        path: `${Paths.NOT_FOUND}`,
        callback: async () => {
          const { default: NotFound } = await import('@pages/not-found/not-found');
          this.setContent(Paths.NOT_FOUND as string, new NotFound());
        },
      },
    ];
  }

  private setContent(page: string, component: ComponentView): void {
    this.header?.setSelectedLink(page);
    this.pageContainer?.addCurrentPage(component);
  }

  public run(): void {
    this.burger.handlerListener();
    profileLinkGuard();
  }
}

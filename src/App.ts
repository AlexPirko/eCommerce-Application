import '@assets/styles/global.scss';
import handleVisibility from '@lib/utils/handle-visibility';
import profileLinkGuard from '@lib/utils/profile-link-guard';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';
import Header from '@layouts/header/header';
import MainFooter from '@layouts/main-footer/main-footer';
import Footer from '@layouts/footer/footer';
import CreateBurger from '@layouts/header/create-burger/create-burger';
import ApiServices from '@lib/api/api-services';
import ComponentView from '@lib/services/component-view';
import { RouteParams } from '@lib/types/params-interface';
import Catalog from '@pages/catalog/catalog';
import Login from '@pages/login/login';
import Main from '@pages/main/main';
import NotFound from '@pages/not-found/not-found';
import PageContainer from '@pages/page-container';
import SignUp from '@pages/sign-up/sign-up';
import Profile from '@pages/profile/profile';

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

  // eslint-disable-next-line max-lines-per-function
  private createRoutes(): RouteParams[] {
    return [
      {
        path: ``,
        callback: () => {
          this.setContent(Paths.MAIN, new Main());
        },
      },
      {
        path: `${Paths.MAIN}`,
        callback: () => {
          this.setContent(Paths.MAIN, new Main());
        },
      },
      {
        path: `${Paths.CATALOG}`,
        callback: () => {
          this.setContent(Paths.CATALOG, new Catalog());
        },
      },
      {
        path: `${Paths.ABOUT}`,
        callback: () => {},
      },
      {
        path: `${Paths.PROFILE}`,
        callback: () => {
          this.setContent(Paths.PROFILE, new Profile());
        },
      },
      {
        path: `${Paths.SIGNUP}`,
        callback: () => {
          this.setContent(Paths.SIGNUP, new SignUp());
        },
      },
      {
        path: `${Paths.LOGIN}`,
        callback: () => {
          this.setContent(Paths.LOGIN, new Login());
        },
      },
      {
        path: `${Paths.NOT_FOUND}`,
        callback: () => {
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

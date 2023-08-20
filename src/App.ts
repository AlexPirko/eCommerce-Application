import '@assets/styles/global.scss';
import toggleNavBtn from '@lib/utils/toggleNavBtn';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';
import Header from '@layouts/header/header';
import ApiServices from '@lib/api/api-services';
import ComponentView from '@lib/services/component-view';
import { RouteParams } from '@lib/types/params-interface';
import Catalog from '@pages/catalog/catalog';
import Login from '@pages/login/login';
import Main from '@pages/main/main';
import NotFound from '@pages/not-found/not-found';
import PageContainer from '@pages/page-container';
import SignUp from '@pages/sign-up/sign-up';

export default class App {
  private static container: HTMLElement = document.getElementById('body') as HTMLElement;
  private router: Router;
  private pageContainer: PageContainer | null;
  private header: Header | null;
  private _apiServices: ApiServices;

  constructor() {
    this._apiServices = new ApiServices();
    this.pageContainer = null;
    this.header = null;

    const routes: RouteParams[] = this.createRoutes();
    this.router = new Router(routes);

    this.createView();
    toggleNavBtn();
  }

  private createView(): void {
    this.pageContainer = new PageContainer();
    this.header = new Header(this.router);

    App.container.append(
      this.header.getHtmlElement() as HTMLElement,
      this.pageContainer.getHtmlElement() as HTMLElement
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
        path: `${Paths.ACCOUNT}`,
        callback: () => {},
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

  public run(): void {}
}

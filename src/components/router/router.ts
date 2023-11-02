import { RouteParams, RequestParams } from '@lib/types/params-interface';
import { Paths, PRODUCT_SELECTOR } from './paths';
import SetRouterHistory from './set-router-history';
// import HashRouter from './hash-router';

export default class Router {
  private static _instance: Router;

  private routes!: RouteParams[] | null;

  private routerHistory!: SetRouterHistory;

  public handler: SetRouterHistory | undefined;

  constructor(routes: RouteParams[] | null) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = routes;

    this.handler = new SetRouterHistory(this.changeUrlHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.handler?.navigate(null);
    });

    Router._instance = this;
  }

  public navigate(url: string | null): void {
    this.handler?.navigate(url);
  }

  private changeUrlHandler(params: RequestParams): void {
    const currUrl: string = params.resource === '' ? params.path : `${params.path}/${PRODUCT_SELECTOR}`;
    const route: RouteParams | undefined = this.routes?.find((item) => item.path === currUrl);

    if (!route) {
      this.redirectToNotFound();
      return;
    }

    route.callback?.(params.resource);
  }

  private redirectToNotFound(): void {
    const routeNotFound: RouteParams | undefined = this.routes?.find((item) => item.path === Paths.NOT_FOUND);
    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }
}

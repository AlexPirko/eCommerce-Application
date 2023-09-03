import { RouteParams, RequestParams } from '@lib/types/params-interface';
import { Paths, PRODUCT_SELECTOR } from './paths';
import SetRouterHistory from './set-router-history';

export default class Router {
  private static _instance: Router;

  private routes!: RouteParams[] | null;

  private routerHistory!: SetRouterHistory;

  constructor(routes: RouteParams[] | null) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = routes;

    this.routerHistory = new SetRouterHistory(this.changeUrlHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.routerHistory.navigate('');
    });

    Router._instance = this;
  }

  public navigate(url: string | PopStateEvent): void {
    this.routerHistory.navigate(url);
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

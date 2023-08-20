import { RouteParams, RequestParams } from '@lib/types/params-interface';
import { Paths } from './paths';
import SetRouterHistory from './set-router-history';

export default class Router {
  private routes: RouteParams[] | null;

  private routerHistory: SetRouterHistory;

  constructor(routes: RouteParams[] | null) {
    this.routes = routes;

    this.routerHistory = new SetRouterHistory(this.changeUrlHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.routerHistory.navigate('');
    });
  }

  public navigate(url: string | PopStateEvent): void {
    this.routerHistory.navigate(url);
  }    

  private changeUrlHandler(params: RequestParams): void {
    const currentUrl: string = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route: RouteParams | undefined = this.routes?.find((item) => item.path === currentUrl);

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

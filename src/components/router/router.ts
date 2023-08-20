import { RouteParams, RequestParams } from '@lib/types/params-interface';
import { Paths } from './paths';

export default class Router {
  private routes: RouteParams[] | null;
  constructor(routes: RouteParams[] | null) {
    this.routes = routes;

    this.handleListeners();
  }

  public navigate(url: string): void {
    if (typeof url === 'string') {
      this.setHistoryUrl(url);
    }

    const request: RequestParams = this.parseUrl(url);

    const currentUrl: string = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route: RouteParams | undefined = this.routes?.find((item) => item.path === currentUrl);

    if (!route) {
      this.redirectToNotFound();
      return;
    }
    route.callback?.();
  }

  private parseUrl(url: string): RequestParams {
    const result: RequestParams = {
      path: '',
      resource: '',
    };

    const path: string[] = url.split('/');
    [result.path = '', result.resource = ''] = path;

    return result;
  }

  private redirectToNotFound(): void {
    const routeNotFound: RouteParams | undefined = this.routes?.find((item) => item.path === Paths.NOT_FOUND);
    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }

  private changeUrlHandler(): void {
    const url: string = this.getCurrentUrl();
    this.navigate(url);
  }

  private getCurrentUrl(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    } else {
      return window.location.pathname.slice(1);
    }
  }

  private handleListeners(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.changeUrlHandler();
    });
    window.addEventListener('popstate', this.changeUrlHandler.bind(this));
    window.addEventListener('hashchange', this.changeUrlHandler.bind(this));
  }

  private setHistoryUrl(url: string): void {
    window.history.pushState({}, '', `/${url}`);
  }
}

import { RouteParams } from '@lib/types/params-interface';
import { Paths } from './paths';

export default class Router {
  routes: RouteParams[];
  constructor(routes: RouteParams[]) {
    this.routes = routes;

    this.handleListeners();
  }

  navigate(url: string) {
    if (typeof url === 'string') {
      this.setHistoryUrl(url);
    }

    const request = this.parseUrl(url);

    const currentUrl = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
    const route = this.routes.find((item) => item.path === currentUrl);

    if (!route) {
      this.redirectToNotFound();
      return;
    }
    route.callback?.();
  }

  parseUrl(url: string) {
    const result = {
      path: '',
      resource: '',
    };

    const path: string[] = url.split('/');
    [result.path = '', result.resource = ''] = path;

    return result;
  }

  redirectToNotFound() {
    const routeNotFound = this.routes.find((item) => item.path === Paths.NOT_FOUND);
    if (routeNotFound) {
      this.navigate(routeNotFound.path);
    }
  }

  changeUrlHandler() {
    const url = this.getCurrentUrl();
    this.navigate(url);
  }

  getCurrentUrl() {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    } else {
      return window.location.pathname.slice(1);
    }
  }

  handleListeners() {
    document.addEventListener('DOMContentLoaded', () => {
      const url = this.getCurrentUrl();
      this.navigate(url);
    });
    window.addEventListener('popstate', this.changeUrlHandler.bind(this));
    window.addEventListener('hashchange', this.changeUrlHandler.bind(this));
  }

  setHistoryUrl(url: string) {
    window.history.pushState({}, '', `/${url}`);
  }
}

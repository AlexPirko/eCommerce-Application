import { RouteParams } from '@lib/types/params-interface';
import { Paths } from './paths';

export default class Router {
  routes: RouteParams[];
  constructor(routes: RouteParams[]) {
    this.routes = routes;
  }

  navigate(url: string) {
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
}

import { RouteParams } from '@lib/types/params-interface';

export default class Router {
  routes: RouteParams[];
  constructor(routes: RouteParams[]) {
    this.routes = routes;
  }
  navigate(path: string) {
    console.log(path);
  }
}

import { RequestParams } from '@lib/types/params-interface';

export default class SetRouterHistory {
  private cb: (arg0: RequestParams) => void;

  constructor(cb: (arg0: RequestParams) => void) {
    this.cb = cb;

    window.addEventListener('popstate', this.navigate.bind(this));
  }

  public navigate(url: string | PopStateEvent): void {
    if (typeof url === 'string') {
      this.setHistory(url);
    }

    let pathUrl: string = '';
    if (window.location.hash) {
      pathUrl = window.location.hash.slice(1);
    } else {
      pathUrl = window.location.pathname.slice(1);
    }

    const result: RequestParams = {
      path: '',
      resource: '',
    };

    const path: string[] = pathUrl.split('/');
    [result.path = '', result.resource = ''] = path;

    this.cb(result);
  }

  private setHistory(url: string): void {
    window.history.pushState(null, '', `/${url}`);
  }
}

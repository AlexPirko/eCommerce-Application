import { RequestParams } from '@lib/types/params-interface';

export default class SetRouterHistory {
  private cb: (arg0: RequestParams) => void;
  event: keyof WindowEventMap;
  handler: (url: string) => void;

  constructor(cb: (arg0: RequestParams) => void) {
    this.cb = cb;

    this.handler = this.navigate.bind(this);

    this.event = 'popstate';

    window.addEventListener(this.event, this.handler as unknown as EventListenerOrEventListenerObject);
  }

  public navigate(url: string): void {
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

  disable() {
    window.removeEventListener(this.event, this.handler as unknown as EventListenerOrEventListenerObject);
  }

  setHistory(url: string): void {
    window.history.pushState(null, '', `/${url}`);
  }
}

import { RequestParams } from '@lib/types/params-interface';
import SetRouterHistory from './set-router-history';

export default class HashRouter extends SetRouterHistory {
  constructor(cbRouter: (arg0: RequestParams) => void) {
    super(cbRouter);

    this.event = 'hashchange';

    window.addEventListener(this.event, this.handler as unknown as EventListenerOrEventListenerObject);
  }

  public setHistory(url: string): void {
    window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${url}`;
  }
}

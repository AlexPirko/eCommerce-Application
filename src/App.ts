import ApiServices from '@lib/api/api-services';

export default class App {
  private static container: HTMLElement = document.querySelector('#root') as HTMLElement;
  private _apiServices: ApiServices;

  constructor() {
    this._apiServices = new ApiServices();
  }

  public run(): void {}
}

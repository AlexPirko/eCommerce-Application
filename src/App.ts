import ApiServices from '@lib/api/api-services';

export default class App {
  private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

  constructor() {}

  public async run(): Promise<void> {
    const apiServices: ApiServices = new ApiServices();
    apiServices.setApiClient();
  }
}

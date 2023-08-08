export default class App {
  private static container: HTMLElement = document.querySelector('#root') as HTMLElement;

  constructor() {}

  public run(): void {
    console.log(App.container);
  }
}

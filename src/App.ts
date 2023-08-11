import '@assets/styles/global.scss';
import Header from '@layouts/header/header';
import Main from '@pages/main/main';

export default class App {
  private static container: HTMLElement = document.getElementById('body') as HTMLElement;

  constructor() {
    this.createView();
  }

  createView(): void {
    const header: Header = new Header();
    const main: Main = new Main();
    App.container.append(header.getHtmlElement() as HTMLElement, main.getHtmlElement() as HTMLElement);
  }

  public run(): void {}
}

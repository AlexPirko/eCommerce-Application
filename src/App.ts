import '@assets/styles/global.scss';
import Header from '@layouts/header/header';
// import createElementFromHtml from '@lib/utils/create-element-from-html';

export default class App {
  private static container: HTMLElement = document.getElementById('body') as HTMLElement;

  constructor() {
    this.createView();
  }

  createView(): void {
    const header: Header = new Header();
    App.container.append(header.getHtmlElement() as HTMLElement);
  }

  public run(): void {}
}

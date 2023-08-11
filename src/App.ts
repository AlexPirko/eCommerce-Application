import '@assets/styles/global.scss';
import Header from '@layouts/header/header';
import PageContainer from '@pages/page-container';

export default class App {
  private static container: HTMLElement = document.getElementById('body') as HTMLElement;

  constructor() {
    this.createView();
  }

  createView(): void {
    const pageContainer: PageContainer = new PageContainer();
    const header: Header = new Header(pageContainer);

    App.container.append(header.getHtmlElement() as HTMLElement, pageContainer.getHtmlElement() as HTMLElement);
  }

  public run(): void {}
}

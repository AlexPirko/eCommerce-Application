import './main.scss';
import { Params } from '@lib/types/params-interface';
import createHTMLElement from '@lib/utils/create-html-element';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Main extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['main-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
    this.createContent();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h1',
      classNames: ['main-title'],
      text: 'Main',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElementBuilder.addInnerElement(titleElementBuilder);
  }

  private createContent(): void {
    const signupLink: HTMLHeadingElement = createHTMLElement('h3', ['signup-title']);
    const loginLink: HTMLHeadingElement = createHTMLElement('h3', ['login-title']);
    signupLink.innerHTML = `<div class="link-wrapper">
        <i class="material-icons main-icons">settings_power</i>
        <a href="http://localhost:8080/signup" class="main-link">Sign up</a>
      </div>`;
    loginLink.innerHTML = `<div class="link-wrapper">
        <i class="material-icons main-icons">vpn_key</i>
        <a href="http://localhost:8080/login" class="main-link">Log in</a>
      </div>`;

    this.viewElementBuilder.addInnerElement(signupLink);
    this.viewElementBuilder.addInnerElement(loginLink);
  }
}

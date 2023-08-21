import './main.scss';
import { Params } from '@lib/types/params-interface';
import createHTMLElement from '@lib/utils/create-html-element';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';

export default class Main extends ComponentView {
  isLogin!: boolean;
  constructor(isLogin: boolean) {
    const params: Params = {
      tagName: 'section',
      classNames: ['main-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
    this.createContent(isLogin);
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

  private createContent(isLogin: boolean): void {
    const signupTitle: HTMLElement = createHTMLElement('div', ['signup-title']);
    const signupIcon: HTMLElement = createHTMLElement('i', ['material-icons', 'main-icons']);
    signupIcon.textContent = 'settings_power';
    const signupLink: HTMLElement = createHTMLElement('a', ['main-link']);
    signupLink.textContent = 'Sign up';
    signupTitle.append(signupIcon, signupLink);

    const loginTitle: HTMLElement = createHTMLElement('div', ['login-title']);
    const loginIcon: HTMLElement = createHTMLElement('i', ['material-icons', 'main-icons']);
    loginIcon.textContent = 'vpn_key';
    const loginLink: HTMLElement = createHTMLElement('a', ['main-link']);
    loginLink.textContent = 'Login up';
    loginTitle.append(loginIcon, loginLink);

    signupTitle.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      if (!isLogin) {
        document.location.href = `http://${window.location.host}/signup`;
      } else {
        document.location.href = `http://${window.location.host}`;
      }
    });

    loginTitle.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      if (!isLogin) {
        document.location.href = `http://${window.location.host}/login`;
      } else {
        document.location.href = `http://${window.location.host}`;
      }
    });

    this.viewElementBuilder.addInnerElement(signupTitle);
    this.viewElementBuilder.addInnerElement(loginTitle);
  }
}

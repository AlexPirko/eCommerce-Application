import './main.scss';
import { Params } from '@lib/types/params-interface';
import makeElement from '@lib/utils/make-element';
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
    const signupTitle: HTMLElement = makeElement('div', ['signup-title']);
    const signupIcon: HTMLElement = makeElement('i', ['material-icons', 'main-icons']);
    signupIcon.textContent = 'settings_power';
    const signupLink: HTMLElement = makeElement('a', ['main-link']);
    signupLink.setAttribute('href', `http://${window.location.host}/signup`);
    signupLink.textContent = 'Sign up';
    signupTitle.append(signupIcon, signupLink);

    const loginTitle: HTMLElement = makeElement('div', ['login-title']);
    const loginIcon: HTMLElement = makeElement('i', ['material-icons', 'main-icons']);
    loginIcon.textContent = 'vpn_key';
    const loginLink: HTMLElement = makeElement('a', ['main-link']);
    loginLink.textContent = 'Login up';
    loginLink.setAttribute('href', `http://${window.location.host}/login`);
    loginTitle.append(loginIcon, loginLink);

    if (isLogin) {
      signupLink.setAttribute('href', `http://${window.location.host}`);
      loginLink.setAttribute('href', `http://${window.location.host}`);
    }

    this.viewElementBuilder.addInnerElement(signupTitle);
    this.viewElementBuilder.addInnerElement(loginTitle);
  }
}

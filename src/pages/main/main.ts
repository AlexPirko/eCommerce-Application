import './main.scss';
import { Params } from '@lib/types/params-interface';
import createHTMLElement from '@lib/utils/create-html-element';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import Router from '@components/router/router';

export default class Main extends ComponentView {
  isLogin!: boolean;
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
    const router: Router = new Router(null);
    const isLogin: string | null = localStorage.getItem('refreshToken');
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
        router.navigate(`http://${window.location.host}/signup`);
      } else {
        router.navigate(`http://${window.location.host}`);
      }
    });

    loginTitle.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      if (!isLogin) {
        router.navigate(`http://${window.location.host}/login`);
      } else {
        router.navigate(`http://${window.location.host}`);
      }
    });

    this.viewElementBuilder.addInnerElement(signupTitle);
    this.viewElementBuilder.addInnerElement(loginTitle);
  }
}

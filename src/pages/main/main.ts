import './main.scss';
import promo from '../../assets/images/promo.png';
import promo2 from '../../assets/images/promo-2.png';
import nikonPromo from '../../assets/images/nikon-promo.png';
import { Params } from '@lib/types/params-interface';
import createHTMLElement from '@lib/utils/create-html-element';
import ComponentView from '@lib/services/component-view';
import Router from '@components/router/router';
import { Paths } from '@components/router/paths';
import M from 'materialize-css';

export default class Main extends ComponentView {
  protected isLogin!: boolean;
  readonly mainPageSlider: HTMLDivElement;

  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['main-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.mainPageSlider = createHTMLElement('div', ['main_page-slider']);
    this.createContent();
  }

  private createContent(): void {
    const router: Router = new Router(null);
    const isLogin: string | null = localStorage.getItem('refreshToken');

    const mainTitle: HTMLDivElement = createHTMLElement('h1', ['main-title']);
    mainTitle.textContent = 'Make Your Choise:';
    const signupTitle: HTMLDivElement = createHTMLElement('div', ['signup-title']);
    const signupIcon: HTMLElement = createHTMLElement('i', ['material-icons', 'main-icons']);
    signupIcon.textContent = 'settings_power';
    const signupLink: HTMLElement = createHTMLElement('a', ['main-link']);
    signupLink.textContent = 'Sign up';
    signupTitle.append(signupIcon, signupLink);

    const loginTitle: HTMLDivElement = createHTMLElement('div', ['login-title']);
    const loginIcon: HTMLElement = createHTMLElement('i', ['material-icons', 'main-icons']);
    loginIcon.textContent = 'vpn_key';
    const loginLink: HTMLElement = createHTMLElement('a', ['main-link']);
    loginLink.textContent = 'Log in';
    loginTitle.append(loginIcon, loginLink);

    const linkContainer: HTMLDivElement = createHTMLElement('div', ['link-container']);
    linkContainer.append(mainTitle, signupTitle, loginTitle);

    this.mainPageSlider.innerHTML = this.createPromocodeSlider();

    signupTitle.addEventListener('click', (e: Event): void => {
      e.preventDefault();
      if (!isLogin) {
        router.navigate(`${Paths.SIGNUP}`);
      } else {
        router.navigate(`${Paths.MAIN}`);
      }
    });

    loginTitle.addEventListener('click', (): void => {
      if (!isLogin) {
        router.navigate(`${Paths.LOGIN}`);
      } else {
        router.navigate(`${Paths.MAIN}`);
      }
    });

    this.viewElementBuilder.addInnerElement(linkContainer);
    this.viewElementBuilder.addInnerElement(this.mainPageSlider);
    this.initSlider(this.mainPageSlider);
  }

  private createPromocodeSlider(): string {
    const img1: HTMLImageElement = new Image();
    img1.src = promo;
    const img2: HTMLImageElement = new Image();
    img2.src = promo2;
    const img3: HTMLImageElement = new Image();
    img3.src = nikonPromo;

    return `<div class="carousel carousel-slider center">
      <div class="carousel-item white-text" href="#one!">
        <h2 class="main-slider_title">Promocode:</h2>
        <h4 class="main-slider_subtitle">PR-1 (5%)</h4>
        <img class="main-slider_image" src=${promo}>
      </div>
      <div class="carousel-item white-text" href="#two!">
        <h2 class="main-slider_title">Promocode:</h2>
        <h4 class="main-slider_subtitle">PR-2 (7%)</h4>
        <img class="main-slider_image" src=${promo2}>
      </div>
      <div class="carousel-item white-text" href="#three!">
        <h2 class="main-slider_title">Promocode:</h2>
        <h4 class="main-slider_subtitle">PR-3 (10%)</h4>
        <img class="main-slider_image" src=${nikonPromo}>
      </div>
    </div>`;
  }

  private initSlider(el: HTMLDivElement): void {
    M.AutoInit();
    M.Carousel.init(el, {
      indicators: true,
      fullWidth: true,
      duration: 150,
    });

    setInterval(() => {
      M.Carousel.getInstance(el).next();
    }, 3000);
  }
}

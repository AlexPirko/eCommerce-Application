import './not-found.scss';
import mainImage from '../../assets/images/404.gif';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import createHTMLElement from '@lib/utils/create-html-element';

export default class NotFound extends ComponentView {
  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['not-found'],
      text: '',
      callback: null,
    };
    super(params);
    this.configureView();
    this.createContent();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['nf-title'],
      text: 'Something wrong here...',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);
    this.viewElementBuilder.addInnerElement(titleElementBuilder);
  }

  private createContent(): void {
    const pageWrapper: HTMLDivElement = createHTMLElement('div', ['page-wrapper']);
    const firstFigure: HTMLHeadingElement = createHTMLElement('h2', ['four-figure']);
    const lastFigure: HTMLHeadingElement = createHTMLElement('h2', ['four-figure']);
    firstFigure.textContent = '4';
    lastFigure.textContent = '4';

    const img: HTMLImageElement = new Image();
    img.src = mainImage;
    img.classList.add('not-found__image');

    const info: HTMLDivElement = createHTMLElement('div', ['info-wrapper']);
    const infoTitle: HTMLHeadingElement = createHTMLElement('h3', ['info-title']);
    infoTitle.textContent = '...page not found';

    const backBtn: HTMLLinkElement = createHTMLElement('a', ['back-btn', 'waves-effect', 'btn']);
    backBtn.href = 'http://localhost:8080/';
    backBtn.innerHTML =
      '<i class="back-btn__icon material-icons">camera</i><i class="back-btn__icon material-icons">keyboard_return</i>';
    info.append(infoTitle, backBtn);
    pageWrapper.append(firstFigure, img, lastFigure);
    this.viewElementBuilder.addInnerElement(pageWrapper);
    this.viewElementBuilder.addInnerElement(info);
  }
}

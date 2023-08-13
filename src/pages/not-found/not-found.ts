import './not-found.scss';
import mainImage from '../../assets/images/404.gif';
import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import makeElement from '@lib/utils/make-element';

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

  createContent() {
    const pageWrapper: HTMLElement = makeElement('div', ['page-wrapper']);
    const firstFigure: HTMLElement = makeElement('h2', ['four-figure']);
    const lastFigure: HTMLElement = makeElement('h2', ['four-figure']);
    firstFigure.textContent = '4';
    lastFigure.textContent = '4';
    const img: HTMLImageElement = new Image();
    img.src = mainImage;
    img.classList.add('not-found__image');

    const info: HTMLElement = makeElement('div', ['info-wrapper']);
    const infoTitle: HTMLElement = makeElement('h3', ['info-title']);
    infoTitle.textContent = '...page not found';
    const backBtn: HTMLElement = makeElement('button', ['back-btn', 'waves-effect', 'btn']);
    backBtn.innerHTML =
      '<i class="back-btn__icon material-icons">camera</i><i class="back-btn__icon material-icons">keyboard_return</i>';
    info.append(infoTitle, backBtn);
    pageWrapper.append(firstFigure, img, lastFigure);
    this.viewElementBuilder.addInnerElement(pageWrapper);
    this.viewElementBuilder.addInnerElement(info);
  }
}

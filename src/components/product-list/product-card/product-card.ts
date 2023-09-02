import './product-card.scss';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import { CardParams } from '@lib/types/params-interface';
import cardTemplate from './product-card.html';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';

export default class ProductCard {
  private _element: HTMLDivElement;
  private _cardParams: CardParams;
  router: Router;

  constructor(cardParams: CardParams) {
    this.router = new Router(null);
    this._element = createElementFromHtml<HTMLDivElement>(cardTemplate);
    this._cardParams = cardParams;
    this.setCard();
    this.setDeatailedButtonClickEventHandler();
  }

  private setCard(): void {
    this._element.dataset.key = this._cardParams.key;
    this.setImagesUrl();

    Object.keys(this._cardParams).forEach((key) => {
      if (key !== 'imgUrls') {
        this.setTextElementsInfo(key);
      }
    });
  }

  private setImagesUrl(): void {
    const images: NodeListOf<HTMLImageElement> = this._element.querySelectorAll('img');
    images.forEach((imag, index) => imag.setAttribute('src', this._cardParams.imgUrls[index]));
  }

  private setTextElementsInfo(textElementClass: string): void {
    const textElement: HTMLSpanElement | null = this._element.querySelector(`.${textElementClass}`);

    type CardParamsKey = keyof typeof this._cardParams;
    if (textElement) {
      if (textElementClass !== 'price') {
        textElement.innerHTML = this._cardParams[textElementClass as CardParamsKey] as string;
      } else {
        textElement.innerHTML = ('$' + this._cardParams[textElementClass as CardParamsKey]) as string;
      }
    }
  }

  private setDeatailedButtonClickEventHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__detailed');
    button?.addEventListener('click', (): void => {
      this.buttonClickHandler(`${Paths.CATALOG}/${this._cardParams.key}`);
    });
  }

  private buttonClickHandler(path: string) {
    this.router.navigate(path);
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

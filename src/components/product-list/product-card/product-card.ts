import './product-card.scss';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import cardTemplate from './product-card.html';
import { CardParams } from '@lib/types/params-interface';

export default class ProductCard {
  private _element: HTMLDivElement;
  private _cardParams: CardParams;

  constructor(cardParams: CardParams) {
    this._element = createElementFromHtml<HTMLDivElement>(cardTemplate);
    this._cardParams = cardParams;
    this.setCard();
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
    button?.addEventListener('click', (): void => {});
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

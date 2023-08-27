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
    this.setImagesUrl();
    Object.keys(this._cardParams).forEach((key) => {
      if (key !== 'imgUrls') {
        this.setTextInfo(key);
      }
    });
  }

  private setImagesUrl(): void {
    const images: NodeListOf<HTMLImageElement> = this._element.querySelectorAll('img');
    images.forEach((imag, index) => imag.setAttribute('src', this._cardParams.imgUrls[index]));
  }

  private setTextInfo(elementClass: string): void {
    const textElement: HTMLSpanElement | null = this._element.querySelector(`.${elementClass}`);
    if (textElement) {
      textElement.innerHTML = this._cardParams[elementClass as keyof typeof this._cardParams] as string;
    }
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

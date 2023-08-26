import './product-card.scss';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import cardTemplate from './product-card.html';
// import { CardParams } from "@lib/types/card-params";

export default class ProductCard {
  private _element: HTMLDivElement;
  //private _cardParams: CardParams;

  constructor() {
    //cardParams: CardParams) {
    this._element = createElementFromHtml<HTMLDivElement>(cardTemplate);
    //this._cardParams = cardParams;
  }

  private setCard() {}

  public get element(): HTMLDivElement {
    return this._element;
  }
}

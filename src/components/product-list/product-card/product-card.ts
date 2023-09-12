import './product-card.scss';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';
import { CardParams } from '@lib/types/params-interface';
import cardTemplate from './product-card.html';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';
import ApiServices from '@lib/api/api-services';

export default class ProductCard {
  private _element: HTMLDivElement;
  private _cardParams: CardParams;
  private _isInCart: boolean;
  public router: Router;

  constructor(cardParams: CardParams, isInCart: boolean) {
    this.router = new Router(null);
    this._element = createElementFromHtml<HTMLDivElement>(cardTemplate);
    this._cardParams = cardParams;
    this._isInCart = isInCart;
    this.setCard();
    this.setDeatailedButtonClickEventHandler();
    this.setAddToCartButtonClickHandler();
    this.setPriceStyle();
  }

  private setCard(): void {
    this._element.dataset.key = this._cardParams.key;
    this._element.dataset.sku = this._cardParams.sku;
    this.setImagesUrl();

    Object.keys(this._cardParams).forEach((key) => {
      if (key !== 'imgUrls') {
        this.setTextElementContent(key);
      }
    });
  }

  private setImagesUrl(): void {
    const images: NodeListOf<HTMLImageElement> = this._element.querySelectorAll('img');
    images.forEach((imag, index) => imag.setAttribute('src', this._cardParams.imgUrls[index]));
  }

  private setTextElementContent(textElementClass: string): void {
    const textElement: HTMLSpanElement | null = this._element.querySelector(`.${textElementClass}`);

    type CardParamsKey = keyof typeof this._cardParams;
    if (textElement) {
      if (textElementClass === 'price') {
        const oldPrice: number = (this._cardParams[textElementClass as CardParamsKey] as number) / 100;
        textElement.innerHTML = changeCurrencyFormat(oldPrice);
      } else if (textElementClass === 'discount') {
        const discount: number = (this._cardParams[textElementClass as CardParamsKey] as number) / 100;
        if (!discount) {
          textElement.innerHTML = '';
        } else {
          textElement.innerHTML = changeCurrencyFormat(discount);
        }
      } else if (textElementClass === 'description') {
        const description: string = this._cardParams[textElementClass as CardParamsKey] as string;
        textElement.innerHTML = description.slice(0, 150) + '...';
      } else {
        textElement.innerHTML = this._cardParams[textElementClass as CardParamsKey] as string;
      }
    }
  }

  private setDeatailedButtonClickEventHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__detailed');
    button?.addEventListener('click', (): void => {
      this.detailButtonClickHandler(`${Paths.CATALOG}/${this._cardParams.key}`);
    });
  }

  private setAddToCartButtonClickHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__add-to-cart');
    if (this._isInCart && button) button.disabled = true;
    button?.addEventListener('click', async (): Promise<void> => {
      const api = new ApiServices();
      const sku = this._element.dataset.sku;
      button.disabled = true;
      await api
        .getActiveCart()
        .then(async (res): Promise<void> => {
          await api
            .updateCart(res.body.id, { version: res.body.version, actions: [{ action: 'addLineItem', sku: sku }] })
            .catch((error) => error);
        })
        .catch(async (error) => {
          await api.createCart({ currency: 'USD', lineItems: [{ sku: sku }] }).catch((error) => error);
          return error;
        });
    });
  }

  private setPriceStyle(): void {
    const discount: HTMLDivElement = this._element.querySelector('.discount') as HTMLDivElement;
    const price: HTMLDivElement = this._element.querySelector('.price') as HTMLDivElement;
    if (discount.innerText === '') {
      price.classList.add('without-discount');
    }
  }

  private detailButtonClickHandler(path: string): void {
    this.router.navigate(path);
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

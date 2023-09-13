import './cart-item.scss';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';
import { CartItemParams } from '@lib/types/params-interface';
import cartItemTemplate from './cart-item.html';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';
import ApiServices from '@lib/api/api-services';

export default class CartItem {
  private _element: HTMLDivElement;
  private _cartItemParams: CartItemParams;
  public router: Router;

  constructor(cartItemParams: CartItemParams) {
    this.router = new Router(null);
    this._element = createElementFromHtml<HTMLDivElement>(cartItemTemplate);
    console.log(this._element);
    this._cartItemParams = cartItemParams;
    this.setCartItem();
    this.setDeatailedButtonClickEventHandler();
    this.setAddToCartButtonClickHandler();
    this.setPriceStyle();
  }

  private setCartItem(): void {
    this._element.dataset.key = this._cartItemParams.key;
    this._element.dataset.sku = this._cartItemParams.sku;
    this.setImagesUrl();

    Object.keys(this._cartItemParams).forEach((key) => {
      if (key !== 'imgUrls') {
        this.setTextElementContent(key);
      }
    });
  }

  private setImagesUrl(): void {
    const images: NodeListOf<HTMLImageElement> = this._element.querySelectorAll('img');
    images.forEach((img, index) => img.setAttribute('src', this._cartItemParams.imgUrls[index]));
  }

  private setTextElementContent(textElementClass: string): void {
    const textElement: HTMLDivElement | null = this._element.querySelector(`.${textElementClass}`);
    type CartItemParamsKey = keyof typeof this._cartItemParams;
    if (textElement) {
      if (textElementClass === 'price') {
        const oldPrice: number = (this._cartItemParams[textElementClass as CartItemParamsKey] as number) / 100;
        textElement.innerHTML = changeCurrencyFormat(oldPrice);
      } else if (textElementClass === 'discount') {
        const discount: number = (this._cartItemParams[textElementClass as CartItemParamsKey] as number) / 100;
        if (!discount) {
          textElement.innerHTML = '';
        } else {
          textElement.innerHTML = changeCurrencyFormat(discount);
        }
      } else {
        textElement.innerHTML = this._cartItemParams[textElementClass as CartItemParamsKey] as string;
      }
    }
  }

  private setDeatailedButtonClickEventHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__detailed');
    button?.addEventListener('click', (): void => {
      this.detailButtonClickHandler(`${Paths.CATALOG}/$this._cartItemParams.key}`);
    });
  }

  private setAddToCartButtonClickHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__add-item');
    if (button) button.disabled = true;
    button?.addEventListener('click', async (): Promise<void> => {
      const api: ApiServices = new ApiServices();
      const sku: string | undefined = this._element.dataset.sku;
      button.disabled = true;
      api
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

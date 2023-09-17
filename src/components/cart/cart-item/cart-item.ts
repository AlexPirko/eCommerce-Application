import './cart-item.scss';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';
import { getCartResponseAsCardData } from '@lib/utils/get-product-data';
import { CartItemParams } from '@lib/types/params-interface';
import cartItemTemplate from './cart-item.html';
import Router from '@components/router/router';
import ApiServices from '@lib/api/api-services';
import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import changeCartCount from '@layouts/header/header-link/header-cart-count';

export default class CartItem {
  private _element: HTMLDivElement;
  private _cartItemParams: CartItemParams;
  public router: Router;

  constructor(cartItemParams: CartItemParams) {
    this.router = new Router(null);
    this._element = createElementFromHtml<HTMLDivElement>(cartItemTemplate);
    this._cartItemParams = cartItemParams;
    this.setCartItem();
    this.setIncreaseItemQuantityButtonClickHandler();
    this.setDecreaseItemQuantityButtonClickHandler();
    this.setDeleteItemButtonEventHandler();
    this.setPriceStyle();
    this.addTotalOrder();
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
      if (textElementClass === 'price' || textElementClass === 'totalPrice') {
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

  private setIncreaseItemQuantityButtonClickHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__increase-quantity');
    button?.addEventListener('click', async (): Promise<void> => {
      const api: ApiServices = new ApiServices();
      const sku: string | undefined = this._element.dataset.sku;
      const removeButton: HTMLButtonElement = this._element.querySelector(
        '.button__decrease-quantity'
      ) as HTMLButtonElement;
      const quantity: HTMLSpanElement = this._element.querySelector('.cart-item__quantity') as HTMLSpanElement;
      const totalPrice: HTMLDivElement = this._element.querySelector('.cart-item__total-price') as HTMLDivElement;

      api
        .getActiveCart()
        .then(async (res: ClientResponse<Cart>): Promise<void> => {
          api
            .updateCart(res.body.id, { version: res.body.version, actions: [{ action: 'addLineItem', sku: sku }] })
            .then((resUpdate: ClientResponse<Cart>): void => {
              quantity.innerHTML = String(parseInt(quantity.innerHTML) + 1);
              totalPrice.innerHTML = resUpdate.body.lineItems.reduce((acc: string, item: LineItem): string => {
                const { sku: currenSku } = getCartResponseAsCardData(item);
                if (currenSku === sku) {
                  acc = changeCurrencyFormat(getCartResponseAsCardData(item).totalPrice / 100);
                }
                return acc;
              }, '');
              removeButton.disabled = false;
            })
            .then(() => this.addTotalOrder())
            .catch((error) => error);
        })
        .catch(async (error) => {
          return error;
        });
    });
  }

  private setDecreaseItemQuantityButtonClickHandler(): void {
    const button: HTMLButtonElement | null = this._element.querySelector('.button__decrease-quantity');
    const quantity: HTMLSpanElement = this._element.querySelector('.cart-item__quantity') as HTMLSpanElement;
    if (button && quantity.innerHTML === '1') button.disabled = true;
    button?.addEventListener('click', async (): Promise<void> => {
      const api: ApiServices = new ApiServices();
      const sku: string | undefined = this._element.dataset.sku;
      const quantity: HTMLSpanElement = this._element.querySelector('.cart-item__quantity') as HTMLSpanElement;
      const totalPrice: HTMLDivElement = this._element.querySelector('.cart-item__total-price') as HTMLDivElement;
      if (quantity.innerHTML === '1') button.disabled = true;

      api
        .getActiveCart()
        .then(async (res: ClientResponse<Cart>): Promise<void> => {
          const { lineItemId } = res.body.lineItems
            .map((item: LineItem): CartItemParams => getCartResponseAsCardData(item))
            .filter((cartProductData: CartItemParams): boolean => cartProductData.sku === sku)[0];
          api
            .updateCart(res.body.id, {
              version: res.body.version,
              actions: [{ action: 'removeLineItem', lineItemId: lineItemId, quantity: 1 }],
            })
            .then((resUpdate: ClientResponse<Cart>): void => {
              quantity.innerHTML = String(parseInt(quantity.innerHTML) - 1);
              totalPrice.innerHTML = resUpdate.body.lineItems.reduce((acc: string, item: LineItem): string => {
                const { lineItemId: currentItemId } = getCartResponseAsCardData(item);
                if (currentItemId === lineItemId) {
                  acc = changeCurrencyFormat(getCartResponseAsCardData(item).totalPrice / 100);
                }
                return acc;
              }, '');
              if (quantity.innerHTML === '1') button.disabled = true;
            })
            .then(() => this.addTotalOrder())
            .catch((error) => error);
        })
        .catch(async (error) => {
          return error;
        });
    });
  }

  private setDeleteItemButtonEventHandler(): void {
    const button: HTMLButtonElement = this._element.querySelector('.delete-item__button') as HTMLButtonElement;
    button.addEventListener('click', async (): Promise<void> => {
      const api: ApiServices = new ApiServices();
      const sku: string | undefined = this._element.dataset.sku;

      api
        .getActiveCart()
        .then(async (res: ClientResponse<Cart>): Promise<void> => {
          const { lineItemId, quantity } = res.body.lineItems
            .map((item: LineItem): CartItemParams => getCartResponseAsCardData(item))
            .filter((cartProductData: CartItemParams): boolean => cartProductData.sku === sku)[0];
          api
            .updateCart(res.body.id, {
              version: res.body.version,
              actions: [{ action: 'removeLineItem', lineItemId: lineItemId, quantity: quantity }],
            })
            .then((): void => {
              this._element.remove();
            })
            .then(() => this.addTotalOrder())
            .then(() => changeCartCount())
            .catch((error) => error);
        })
        .catch(async (error) => {
          return error;
        });
    });
  }

  private async addTotalOrder(): Promise<void> {
    const subtotal: HTMLSpanElement = document.querySelector('.subtotal-info') as HTMLSpanElement;
    const api: ApiServices = new ApiServices();
    api
      .getActiveCart()
      .then((res: ClientResponse<Cart>) => {
        const subtotalPrice: string = changeCurrencyFormat(res.body.totalPrice.centAmount / 100);
        subtotal.innerHTML = `${subtotalPrice}`;
      })
      .catch((error) => error);
  }

  private setPriceStyle(): void {
    const discount: HTMLDivElement = this._element.querySelector('.discount') as HTMLDivElement;
    const price: HTMLDivElement = this._element.querySelector('.price') as HTMLDivElement;
    if (discount.innerText === '') {
      price.classList.add('without-discount');
    }
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

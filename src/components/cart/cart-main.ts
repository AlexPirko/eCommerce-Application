import CartItem from '@components/cart/cart-item/cart-item';
import template from './cart-main.html';
import { promos } from '@lib/constants/promo';
import './cart-main.scss';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';

import { Cart, ClientResponse, DiscountCode, LineItem } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams, CartData, CartItemParams } from '@lib/types/params-interface';
import createElementFromHtml from '@lib/utils/create-element-from-html';
import { getCartResponseAsCardData } from '@lib/utils/get-product-data';
import Router from '@components/router/router';
import { Paths } from '@components/router/paths';

export default class CartMain {
  private _element: HTMLDivElement;
  private _cartProductData: CardParams[];
  private _cartData: CartData | null;
  private _api: ApiServices;

  constructor() {
    this._element = createElementFromHtml<HTMLDivElement>(template);
    this._api = new ApiServices();
    this._cartProductData = [];
    this._cartData = null;
    this.setCartList();
    this.setGetCartButtonEventHandler();
    this.setDeleteCartButtonEventHandler();
    this.usePromo();
  }

  async usePromo(): Promise<void> {
    this._api
      .getDiscounts()
      .then((result) => {
        const promoBtn: Element | null = document.querySelector('.promo-btn');
        const promoInput: Element | null = document.querySelector('.promo-input');
        promoBtn?.addEventListener('click', () => {
          const userPromo = (<HTMLInputElement>promoInput).value;
          if (
            promoInput !== null &&
            (userPromo === promos.PR1 || userPromo === promos.PR2 || userPromo === promos.PR3)
          ) {
            (<HTMLButtonElement>promoBtn).disabled = true;
            const curCode: DiscountCode | undefined = result.find(
              (code: DiscountCode): boolean => code.code === userPromo
            );
            if (curCode !== undefined) {
              this._api
                .getDiscount(curCode.id)
                .then(() => {
                  this._api.getActiveCart().then((res) => {
                    this._api
                      .updateCart(res.body.id, {
                        version: res.body.version,
                        actions: [
                          {
                            action: 'addDiscountCode',
                            code: userPromo,
                          },
                        ],
                      })
                      .then((res) => {
                        (<HTMLInputElement>promoInput).value = '';
                        (<HTMLButtonElement>promoBtn).disabled = false;
                        const totalPrices: NodeListOf<Element> = document.querySelectorAll('.cart-item__total-price');
                        res.body.lineItems.forEach((item, index) => {
                          totalPrices[index].innerHTML = changeCurrencyFormat(item.totalPrice.centAmount / 100);
                        });
                      })
                      .catch((er) => console.log(er));
                  });
                })
                .catch((er) => console.log(er));
            }
          }
        });
      })
      .catch((er) => console.log(er));
  }

  private async setCartList(): Promise<void> {
    if (this._cartProductData.length === 0) {
      await this._api
        .getActiveCart()
        .then(async (res: ClientResponse<Cart>): Promise<void> => {
          this._cartProductData = res.body.lineItems.map(
            (item: LineItem): CardParams => getCartResponseAsCardData(item)
          );

          this._cartData = {
            totalPrice: res.body.totalPrice.centAmount,
            discountCodes: res.body.discountCodes,
            directDiscount: res.body.directDiscounts,
          };

          const cartTableElement: HTMLTableElement = this._element.querySelector(
            '.cart__product-list'
          ) as HTMLTableElement;
          this._cartProductData.forEach((item: CardParams): void => {
            const cartItem: CartItem = new CartItem(item as CartItemParams);
            cartTableElement.append(cartItem.element);
          });
        })
        .catch((error) => {
          this._cartProductData = [];
          this._cartData = null;
          return error;
        });
    }
  }

  private setGetCartButtonEventHandler(): void {
    const button: HTMLButtonElement = this._element.querySelector('.button__continue') as HTMLButtonElement;
    const router: Router = new Router(null);
    button.addEventListener('click', (): void => {
      router.navigate(`${Paths.CATALOG}`);
    });
  }

  private setDeleteCartButtonEventHandler(): void {
    const button: HTMLButtonElement = this._element.querySelector('.button__delete-cart') as HTMLButtonElement;
    const cartItem: HTMLDivElement = this._element.querySelector('.cart__product-list') as HTMLDivElement;
    const subtotal: HTMLSpanElement = this._element.querySelector('.subtotal-info') as HTMLSpanElement;
    const cartCount: HTMLDivElement = document.querySelector('.cart-count') as HTMLDivElement;
    button.addEventListener('click', async (): Promise<void> => {
      const res: ClientResponse<Cart> = await this._api.getActiveCart().catch((error) => error);
      await this._api
        .deleteCart(res.body.id, res.body.version)
        .then((): string => (cartCount.innerHTML = '0'))
        .then((): string => (subtotal.innerHTML = ''))
        .then((): void => cartItem.remove())
        .catch((error) => error);
    });
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

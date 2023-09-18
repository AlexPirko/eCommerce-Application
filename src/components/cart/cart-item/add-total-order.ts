import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';

export default async function addTotalOrder(): Promise<void> {
  const subtotal: HTMLSpanElement = document.querySelector('.subtotal-info') as HTMLSpanElement;
  const orderInfo: HTMLSpanElement = document.querySelector('.order-info') as HTMLSpanElement;
  const discountInfo: HTMLSpanElement = document.querySelector('.discount-info') as HTMLSpanElement;
  const api: ApiServices = new ApiServices();
  api
    .getActiveCart()
    .then((res: ClientResponse<Cart>) => {
      const orderPrice: string = changeCurrencyFormat(res.body.totalPrice.centAmount / 100);
      orderInfo.innerHTML = `${orderPrice}`;

      let subtotalPrice: number = 0;
      res.body.lineItems.forEach((el: LineItem): void => {
        subtotalPrice += el.price.value.centAmount * el.quantity;
      });
      subtotal.innerHTML = changeCurrencyFormat(subtotalPrice / 100);
      const discount: number = (res.body.totalPrice.centAmount - subtotalPrice) / 100;
      discountInfo.innerHTML = changeCurrencyFormat(discount);
    })
    .catch((error) => error);
}

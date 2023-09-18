import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';

export default async function changeCartCount() {
  const cartCount: HTMLDivElement = document.querySelector('.cart-count') as HTMLDivElement;
  const api: ApiServices = new ApiServices();
  await api
    .getActiveCart()
    .then((res: ClientResponse<Cart>) => {
      const count = res.body.lineItems.length as number;
      if (count === undefined) {
        cartCount.innerHTML = '0';
      } else {
        cartCount.innerHTML = `${count}`;
      }
    })
    .catch((error) => {
      cartCount.innerHTML = '0';
      return error;
    });
}

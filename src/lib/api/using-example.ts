import // CustomerDraft,
'@commercetools/platform-sdk';
import ApiServices from './api-service';

export default async function apiUsingExample(): Promise<void> {
  // const body: CustomerDraft = {
  //   email: 'kirill22@example.com',
  //   firstName: 'Krill22',
  //   lastName: 'Shrimpy22',
  //   password: 'myPassword123',
  // };
  const apiServices: ApiServices = new ApiServices();
  apiServices.setNewApiClient();
  console.log(apiServices.getTokenCache());
  console.log(await apiServices.getCurrentCustomer());
  //localStorage.setItem('refreshToken', 'ecommerce-app:UevzmFH2UQEBkt8ET60alkt8sD1QhhYV4ROTJWaHqVU');
  //ApiServices.getNewApiClient();
  // ApiServices.getNewApiClient('kirill@example.com', 'myPassword123');
  // const currentCustomerId: string | null = localStorage.getItem('customerId');
  // if (currentCustomerId) {
  //   const responseDeleteCustomer: Customer = await apiServices.deleteCustomer(currentCustomerId, '1');
  //   console.log(`responseDeleteCustomer:\n ${JSON.stringify(responseDeleteCustomer).replaceAll(',', ',\n')}\n`);
  // }
  // const apiServicesClone: ApiServices = ApiServices.getInstance();
  // console.log(`isSingleton: ${apiServices === apiServicesClone}`);
  // const customerSignInResult: CustomerSignInResult = await apiServices.createCustomer();
  // console.log(`customerSignInResult:\n ${JSON.stringify(customerSignInResult).replaceAll(',', ',\n')}\n`);
  // localStorage.setItem('customerId', customerSignInResult.customer.id);
  // const products: ClientResponse<ProductPagedQueryResponse> | void = await apiServices.getProducts();
  // if (products)
  //   console.log(
  //     `ProproductsResponse:\n ${JSON.stringify(products.body.results[0].masterData.current).replaceAll(',', ',\n\t')}\n`
  //   );
  // const responseGetCurrentCustomer: ClientResponse<Customer> | void = await apiServices
  //   .getCurrentCustomer()
  //   .catch(console.log);
  // console.log(`Proproducts:\n ${JSON.stringify(responseGetCurrentCustomer)}\n`);
  // const currentCustomerId: string | null = localStorage.getItem('customerId');
  // if (currentCustomerId) {
  //   const responseDeleteCustomer: Customer = await apiServices.deleteCustomer(currentCustomerId, '1');
  //   console.log(`responseDeleteCustomer:\n ${JSON.stringify(responseDeleteCustomer).replaceAll(',', ',\n')}\n`);
  // }
}

// const responceCreateCustomer: ClientResponse<CustomerSignInResult> = await apiServices.createCustomer(body);
// console.log(`responceCreateCustomer:\n ${JSON.stringify(responceCreateCustomer)}\n`);
// if (responceCreateCustomer) localStorage.setItem('customerId', responceCreateCustomer.body.customer.id);
// const productsResponse: ClientResponse<Customer> | void = await apiServices.getCustommer().catch(console.log);
// console.log(`Proproducts:\n ${JSON.stringify(productsResponse)}\n`);
// const token: Response = await apiServices.getToken();
// console.log(`token:\n ${JSON.stringify(token)}\n`);

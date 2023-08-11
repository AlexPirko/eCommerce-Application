import { Customer, CustomerSignInResult } from '@commercetools/platform-sdk';
import ApiServices from './api-service';

export default async function apiUsingExample(): Promise<void> {
  const apiServices: ApiServices = ApiServices.getInstance();
  const currentCustomerId: string | null = localStorage.getItem('customerId');
  if (currentCustomerId) {
    const responseDeleteCustomer: Customer = await apiServices.deleteCustomer(currentCustomerId, '1');
    console.log(`responseDeleteCustomer:\n ${JSON.stringify(responseDeleteCustomer).replaceAll(',', ',\n')}\n`);
  }
  const apiServicesClone: ApiServices = ApiServices.getInstance();
  console.log(`isSingleton: ${apiServices === apiServicesClone}`);
  const customerSignInResult: CustomerSignInResult = await apiServices.createCustomer();
  console.log(`customerSignInResult:\n ${JSON.stringify(customerSignInResult).replaceAll(',', ',\n')}\n`);
  localStorage.setItem('customerId', customerSignInResult.customer.id);
}

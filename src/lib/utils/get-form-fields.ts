import { CustomerDraft } from '@commercetools/platform-sdk';
import { FilterData, QueryArgs, SortData } from '@lib/types/query-args-interface';
import { getAttributeFilterData } from './attribute-filter-data';

export function getFormFieldsAsCustomerDraft(form: HTMLFormElement): CustomerDraft {
  const formData: FormData = new FormData(form);
  const isUseAsShiping: boolean = Boolean(formData.get('use-as-shipping'));

  const customerData: CustomerDraft = {
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    firstName: String(formData.get('firstName')),
    lastName: String(formData.get('lastName')),
    dateOfBirth: String(formData.get('dateOfBirth')),
    addresses: [
      {
        streetName: String(formData.get('billing-street')),
        city: String(formData.get('billing-city')),
        postalCode: String(formData.get('billing-postal')),
        country: String(formData.get('billing-country')),
      },
      {
        streetName: isUseAsShiping ? String(formData.get('billing-street')) : String(formData.get('shipping-street')),
        city: isUseAsShiping ? String(formData.get('billing-city')) : String(formData.get('shipping-city')),
        postalCode: isUseAsShiping ? String(formData.get('billing-postal')) : String(formData.get('shipping-postal')),
        country: isUseAsShiping ? String(formData.get('billing-country')) : String(formData.get('shipping-country')),
      },
    ],
    defaultBillingAddress: formData.get('defaultBillingAddress') ? 0 : undefined,
    defaultShippingAddress: formData.get('defaultShippingAddress') ? 1 : undefined,
  };
  return customerData;
}

export function getFormFieldsAsFilterData(form: HTMLFormElement, price: string[]): QueryArgs {
  // const queryArgs: {} = {
  //   'text.en-US':'name: "Canon"',
  //   facet: 'variants.price.centAmount:45900',
  // }
  const formData: FormData = new FormData(form);
  const filterData: FilterData = {
    price: `variants.price.centAmount:range (${Number(price[0]) * 100} to ${Number(price[1]) * 100})`,
    brands: getAttributeFilterData(formData, 'brand'),
    types: getAttributeFilterData(formData, 'type'),
    kinds: getAttributeFilterData(formData, 'kind'),
  };

  const sortData: SortData = {
    // price: 'price asc',
    name: 'name.en-US asc',
  };

  const filterParams: QueryArgs = {
    filter: Object.values(filterData),
    sort: Object.values(sortData),
  };
  return filterParams;
}

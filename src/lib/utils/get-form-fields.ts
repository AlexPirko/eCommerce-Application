import { CustomerDraft } from '@commercetools/platform-sdk';

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

export function getFormFieldsAsFilterData(form: HTMLFormElement): CustomerDraft {
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

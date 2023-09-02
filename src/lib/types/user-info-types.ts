import { Address } from '@commercetools/platform-sdk';

export type TUserInfo = {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  id: string;
};
export type TAddressInfo = {
  country?: string;
  city?: string;
  streetName?: string;
  postalCode?: string;
  id?: string;
};
export type TBillingAddressesInfo = {
  addresses?: Address[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
  id: string;
};
export type TShippingAddressesInfo = {
  addresses?: Address[];
  shippingAddressIds?: string[];
  defaultShippingAddressId?: string;
  id: string;
};

export type TAddressCapitalize = 'Billing' | 'Shipping';
export type TAddress = 'billing' | 'shipping';

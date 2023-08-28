import { Address } from '@commercetools/platform-sdk';

export type TUserInfo = {
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  version: number;
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
};
export type TShippingAddressesInfo = {
  addresses?: Address[];
  shippingAddressIds?: string[];
  defaultShippingAddressId?: string;
};

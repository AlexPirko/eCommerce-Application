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
  verion?: number;
};
export type TBillingAddressesInfo = {
  addresses?: Address[];
  billingAddressIds?: string[];
  defaultBillingAddressId?: string;
  version: number;
};
export type TShippingAddressesInfo = {
  addresses?: Address[];
  shippingAddressIds?: string[];
  defaultShippingAddressId?: string;
  version: number;
};

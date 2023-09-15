import { DirectDiscount, DiscountCodeInfo } from '@commercetools/platform-sdk';

export interface Params {
  tagName: string;
  classNames: string[];
  text?: '' | string;
  components?: HTMLElement[];
  callback?: (() => void) | null;
}

export interface PageParams {
  name: string;
  callback: (() => void) | null;
}

export interface RouteParams {
  path: string;
  callback: ((arg0: RequestParams['resource']) => void) | null;
}

export interface RequestParams {
  path: '' | string;
  resource: '' | string;
}

export interface CardParams {
  imgUrls: string[];
  name: string;
  description: string;
  type: string;
  brand: string;
  kind: string;
  price: number;
  discount: number;
  key: string;
  sku: string;
  quantity?: number;
  lineItemId?: string | undefined;
}

export interface CartData {
  totalPrice: number;
  discountCodes: DiscountCodeInfo[];
  directDiscount: DirectDiscount[];
}

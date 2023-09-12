import { FacetResults, QueryParam } from '@commercetools/platform-sdk';
import { CardParams } from './params-interface';

export interface QueryArgs {
  fuzzy?: boolean;
  fuzzyLevel?: number;
  markMatchingVariants?: boolean;
  filter?: string | string[];
  'filter.facets'?: string | string[];
  'filter.query'?: string | string[];
  facet?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  [key: string]: QueryParam;
}

export interface FilterData {
  price: string;
  brands?: string;
  types?: string;
  kinds?: string;
}

export interface SortData {
  price?: string;
  name?: string;
}

export interface SearchResult {
  pageCardParams: CardParams[];
  facets: FacetResults;
}

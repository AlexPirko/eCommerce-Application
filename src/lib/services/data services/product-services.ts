import {
  ClientResponse,
  FacetResults,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import { CardParams } from '@lib/types/params-interface';
import { QueryArgs, SearchResult } from '@lib/types/filter-form-interface';
import { getProductProjectionResponseAsCardData } from '@lib/utils/get-product-data';

export default class ProductServices {
  private static _instance: ProductServices;
  private api!: ApiServices;

  constructor() {
    if (ProductServices._instance) {
      return ProductServices._instance;
    }
    this.api = new ApiServices();
    ProductServices._instance = this;
  }

  public async getPageProductsData(cardsPerPage: number, pageNumber: number): Promise<CardParams[]> {
    const limit: number = cardsPerPage;
    const offset: number = cardsPerPage * (pageNumber - 1);

    const response: ClientResponse<ProductProjectionPagedQueryResponse> = await this.api
      .getProductsBySearch({
        limit: limit,
        offset: offset,
        sort: 'price asc',
      })
      .catch((error) => {
        throw error;
      });

    const results: ProductProjection[] = response.body.results;

    const pageCardParams: CardParams[] = results.map((product) => getProductProjectionResponseAsCardData(product));

    return pageCardParams;
  }

  public async getProductByKey(key: string): Promise<CardParams> {
    const response: ClientResponse<ProductProjection> = await this.api.getProductByKey(key).catch((error) => {
      throw error;
    });

    const cardParams: CardParams = getProductProjectionResponseAsCardData(response.body);
    return cardParams;
  }

  public async getAllProductsData(): Promise<SearchResult> {
    const limit: number = 500;
    const offset: number = 0;

    const response: ClientResponse<ProductProjectionPagedSearchResponse> = await this.api
      .getProductsBySearch({
        limit: limit,
        offset: offset,
        sort: 'price asc',
        facet: [
          'variants.attributes.brand as brand',
          'variants.attributes.type as type',
          'variants.attributes.kind as kind',
        ],
      })
      .catch((error) => {
        throw error;
      });
    const results: ProductProjection[] = response.body.results;
    const pageCardParams: CardParams[] = results.map((product) => getProductProjectionResponseAsCardData(product));
    const facets: FacetResults = response.body.facets;

    const searchResult: SearchResult = {
      pageCardParams: pageCardParams,
      facets: facets,
    };
    return searchResult;
  }

  public async getProductsDataBySearch(queryArgs: QueryArgs, offset?: number, limit?: number): Promise<SearchResult> {
    if (queryArgs !== null && (offset || offset === 0)) {
      queryArgs.offset = limit ? offset * limit : offset;
      queryArgs.limit = limit;
    }

    const response: ClientResponse<ProductProjectionPagedSearchResponse> = await this.api
      .getProductsBySearch(queryArgs)
      .catch((error) => {
        throw error;
      });
    const results: ProductProjection[] = response.body.results;
    const pageCardParams: CardParams[] = results.map((product) => getProductProjectionResponseAsCardData(product));

    const facets: FacetResults = response.body.facets;

    const searchResult: SearchResult = {
      pageCardParams: pageCardParams,
      facets: facets,
    };

    return searchResult;
  }
}

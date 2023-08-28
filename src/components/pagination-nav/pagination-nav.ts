import './pagination-nav.scss';
import teaplate from './pagination-nav.html';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import ProductServices from '@lib/services/data services/product-services';
import { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import {
  nextButtonHandlerService,
  prevButtonHandlerService,
  preventMultipleClickService,
  updateViewService,
} from '@lib/services/pagination-services';
import { CardParams } from '@lib/types/params-interface';
import { MAX_LIMIT_COUNT, PRODUCTS_PER_PAGE } from '@lib/constants/product-list-constants';

export default class CatalogPaginationComponent {
  private _element: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  private _productServices: ProductServices;
  private _api: ApiServices;

  constructor(pageNumber: number) {
    this._element = createElementFromHtml<HTMLDivElement>(teaplate);
    this._cardsPerPage = PRODUCTS_PER_PAGE;
    this._pageNumber = pageNumber;
    this._productServices = new ProductServices();
    this._api = new ApiServices();
    this.setElement();
    this.addPrevButtonEventHandler();
    this.addNextButtonEventHandler();
  }

  private async setElement(): Promise<void> {
    const nextButton: HTMLButtonElement | null = this._element.querySelector('.next__button');

    const allProduct: ClientResponse<ProductPagedQueryResponse> = await this._api
      .getAllProducts(500, 0)
      .catch((error) => error);
    const productCount: number = allProduct.body.count;

    if (productCount > this._cardsPerPage) {
      nextButton?.removeAttribute('disabled');
    }
  }

  private addPrevButtonEventHandler(): void {
    const prevButton: HTMLButtonElement | null = this._element.querySelector('.prev__button');
    prevButton?.setAttribute('data-locked', 'false');

    prevButton?.addEventListener('click', async (event: Event): Promise<void> => {
      if (event.target instanceof HTMLButtonElement && event.target.dataset.locked === 'false') {
        event.target.setAttribute('data-locked', 'true');

        const pageNumberElement: HTMLButtonElement = this._element.querySelector(
          '.catalog-nav__page-number'
        ) as HTMLButtonElement;
        const prevPageNumber: string = (parseInt(pageNumberElement?.innerHTML, 10) - 1).toString();

        localStorage.setItem('pageNumber', prevPageNumber);

        const pageProducts: CardParams[] = await this._productServices
          .getPageProductsData(this._cardsPerPage, +prevPageNumber)
          .catch((error) => error);

        const allProduct: ClientResponse<ProductPagedQueryResponse> = await this._api
          .getAllProducts(MAX_LIMIT_COUNT, 0)
          .catch((error) => error);

        const allProductsCount: number = allProduct.body.count;

        prevButtonHandlerService(this._element, event.target, pageNumberElement, allProductsCount);
        await updateViewService(pageProducts);
        await preventMultipleClickService(event.target);
      }
    });
  }

  private addNextButtonEventHandler(): void {
    const nextButton: HTMLButtonElement | null = this._element.querySelector('.next__button');
    nextButton?.setAttribute('data-locked', 'false');

    nextButton?.addEventListener('click', async (event: Event): Promise<void> => {
      if (event.target instanceof HTMLButtonElement && event.target.dataset.locked === 'false') {
        event.target.setAttribute('data-locked', 'true');

        const pageNumberElement: HTMLButtonElement = this._element.querySelector(
          '.catalog-nav__page-number'
        ) as HTMLButtonElement;
        const nextPageNumber: string = (parseInt(pageNumberElement?.innerHTML, 10) + 1).toString();

        localStorage.setItem('pageNumber', nextPageNumber);

        const pageProducts: CardParams[] = await this._productServices
          .getPageProductsData(this._cardsPerPage, +nextPageNumber)
          .catch((error) => error);

        const allProduct: ClientResponse<ProductPagedQueryResponse> = await this._api
          .getAllProducts(MAX_LIMIT_COUNT, 0)
          .catch((error) => error);

        const allProductsCount: number = allProduct.body.count;

        nextButtonHandlerService(this._element, event.target, pageNumberElement, allProductsCount);
        await updateViewService(pageProducts);
        await preventMultipleClickService(event.target);
      }
    });
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

import './pagination-nav.scss';
import teaplate from './pagination-nav.html';

import createElementFromHtml from '@lib/utils/create-element-from-html';
import ProductServices from '@lib/services/data services/product-services';
import {
  nextButtonHandlerService,
  prevButtonHandlerService,
  preventMultipleClickService,
  updateViewService,
} from '@lib/services/pagination-services';
import { FIRST_PAGE_NUMBER, MAX_LIMIT_COUNT, PRODUCTS_PER_PAGE } from '@lib/constants/product-list-constants';
import ProductFilterForm from '@components/products-filter-form/products-filter-form';
import { QueryArgs, SearchResult } from '@lib/types/filter-form-interface';
import ProductListComponent from '@components/product-list/product-list';

export default class CatalogPaginationComponent {
  private _element: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  private _productServices: ProductServices;
  private _filterForm: ProductFilterForm;

  constructor(pageNumber: number) {
    this._element = createElementFromHtml<HTMLDivElement>(teaplate);
    this._cardsPerPage = PRODUCTS_PER_PAGE;
    this._pageNumber = pageNumber;
    this._productServices = new ProductServices();
    this._filterForm = new ProductFilterForm();
    this.setElement();
    this.addPrevButtonEventHandler();
    this.addNextButtonEventHandler();
  }

  private async setElement(): Promise<void> {
    this.setUpdateFilterDataEventHandler();
    await this.UpdateFilterDataEventHandler();
  }

  private setUpdateFilterDataEventHandler() {
    this._element.addEventListener('update-form', async (): Promise<void> => {
      await this.UpdateFilterDataEventHandler();
    });
  }

  private async UpdateFilterDataEventHandler() {
    const filterData: QueryArgs = this._filterForm.filterData;
    this._productServices
      .getProductsDataBySearch(filterData, FIRST_PAGE_NUMBER - 1, PRODUCTS_PER_PAGE)
      .then((searchResult: SearchResult): void => {
        const productList: HTMLDivElement | null = document.querySelector('.product-list');
        if (productList) productList.remove();
        const newProductList: HTMLDivElement = new ProductListComponent(searchResult.pageCardParams).element;
        this._element.insertAdjacentElement('afterend', newProductList);

        const pageNumberElement: HTMLButtonElement = this._element.querySelector(
          '.catalog-nav__page-number'
        ) as HTMLButtonElement;
        pageNumberElement.innerHTML = FIRST_PAGE_NUMBER.toString();
        localStorage.setItem('pageNumber', FIRST_PAGE_NUMBER.toString());

        const prevButton: HTMLButtonElement | null = this._element.querySelector('.prev__button');
        prevButton?.setAttribute('disabled', 'true');

        const nextButton: HTMLButtonElement | null = this._element.querySelector('.next__button');
        this._productServices
          .getProductsDataBySearch(filterData, 0, MAX_LIMIT_COUNT)
          .then((res: SearchResult): void => {
            const productCount: number = res.pageCardParams.length;
            if (productCount > this._cardsPerPage) {
              nextButton?.removeAttribute('disabled');
            } else {
              nextButton?.setAttribute('disabled', 'true');
            }
          });
      });
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
        const filterData: QueryArgs = this._filterForm.filterData;

        await this._productServices
          .getProductsDataBySearch(filterData, parseInt(prevPageNumber) - 1, PRODUCTS_PER_PAGE)
          .then(async (pageProducts: SearchResult): Promise<void> => {
            const allProduct: SearchResult = await this._productServices
              .getProductsDataBySearch(filterData, 0, MAX_LIMIT_COUNT)
              .catch((error) => error);

            const allProductsCount: number = allProduct.pageCardParams.length;

            prevButtonHandlerService(
              this._element,
              event.target as HTMLButtonElement,
              pageNumberElement,
              allProductsCount
            );
            await updateViewService(pageProducts.pageCardParams);
            await preventMultipleClickService(event.target as HTMLButtonElement);
          })
          .catch((error: Error): Error => error);
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
        const filterData: QueryArgs = this._filterForm.filterData;
        await this._productServices
          .getProductsDataBySearch(filterData, parseInt(nextPageNumber) - 1, PRODUCTS_PER_PAGE)
          .then(async (pageProducts: SearchResult): Promise<void> => {
            const allProduct: SearchResult = await this._productServices
              .getProductsDataBySearch(filterData, 0, MAX_LIMIT_COUNT)
              .catch((error) => error);
            const allProductsCount: number = allProduct.pageCardParams.length;

            nextButtonHandlerService(
              this._element,
              event.target as HTMLButtonElement,
              pageNumberElement,
              allProductsCount
            );
            await updateViewService(pageProducts.pageCardParams);
            await preventMultipleClickService(event.target as HTMLButtonElement);
          })
          .catch((error: Error): Error => {
            console.log(error);
            return error;
          });
      }
    });
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

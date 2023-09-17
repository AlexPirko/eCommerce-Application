import './products-filter-form.scss';
import './no-ui-slider/nouislider.scss';
import teamplate from './product-filter-form.html';
import * as noUiSlider from './no-ui-slider/nouislider.js';
import wNumb from 'wnumb';

import ProductServices from '@lib/services/data services/product-services';
import createElementFromHtml from '@lib/utils/create-element-from-html';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';
import { getFormFieldsAsFilterData } from '@lib/utils/get-form-fields';
import { CardParams } from '@lib/types/params-interface';
import { QueryArgs, SearchResult } from '@lib/types/filter-form-interface';
import { FilterCheckboxComponent } from './filter-checkbox/filter-checkbox';
import { FacetResults, TermFacetResult } from '@commercetools/platform-sdk';

export default class ProductFilterForm {
  private static _instance: ProductFilterForm;
  private _element!: HTMLFormElement;
  private _productServices!: ProductServices;
  private _priceSlider!: noUiSlider.target | null;
  private _allProductData!: CardParams[];
  private _facets!: FacetResults | null;
  private _queryArgs!: QueryArgs | null;

  constructor() {
    if (ProductFilterForm._instance) {
      return ProductFilterForm._instance;
    }
    this._element = createElementFromHtml<HTMLFormElement>(teamplate);
    this._productServices = new ProductServices();
    this._priceSlider = null;
    this._allProductData = [];
    this._facets = null;
    this._queryArgs = null;
    this.setProductFilterForm();
    ProductFilterForm._instance = this;
  }

  private async setProductFilterForm(): Promise<void> {
    const searchResult: SearchResult = await this.getAllProductData();
    this._allProductData = searchResult.pageCardParams;
    this._facets = searchResult.facets;
    this.createPriceSlider();
    this.setPriceFilter();
    this.setBrandFilter();
    this.setTypeFilter();
    this.setKindFilter();
    this.setResetButton();
    this.setSortingTypeSelect();
    this._queryArgs = getFormFieldsAsFilterData(this._element, this._priceSlider?.noUiSlider?.get() as string[]);
    this.setFormSubmitEventHandler();
    this.createMobileFilterBar();
  }

  private setFormSubmitEventHandler(): void {
    this.dispatchUpdateFormEvent();
    const backgroundElem: HTMLDivElement = document.querySelector('.background-element') as HTMLDivElement;
    this._element.addEventListener('submit', async (e: SubmitEvent): Promise<void> => {
      e.preventDefault();
      const priceRange: string[] = this._priceSlider?.noUiSlider?.get() as string[];
      this._queryArgs = getFormFieldsAsFilterData(this._element, priceRange);
      this.dispatchUpdateFormEvent();

      if (window.innerWidth <= 600) {
        this._element.classList.remove('active');
        backgroundElem.style.opacity = '1';
        backgroundElem.style.display = 'none';
      }
    });
  }

  private dispatchUpdateFormEvent(): void {
    const paginationNav: HTMLDivElement = document.querySelector('.catalog-nav') as HTMLDivElement;
    const event: Event = new Event('update-form');
    paginationNav.dispatchEvent(event);
  }

  private async createPriceSlider(): Promise<void> {
    const slider: noUiSlider.target = this._element.querySelector('.price-slider') as noUiSlider.target;
    noUiSlider.create(slider, {
      start: [13900 / 100, this._allProductData[this._allProductData.length - 1].price / 100],
      connect: true,
      step: 1,
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: {
        min: this._allProductData[0].price / 100,
        max: this._allProductData[this._allProductData.length - 1].price / 100,
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    this._priceSlider = slider;
  }

  private setPriceFilter(): void {
    const leftValue: HTMLSpanElement = this._element.querySelector('.price-ranger__left-value') as HTMLSpanElement;
    const rightValue: HTMLSpanElement = this._element.querySelector('.price-ranger__right-value') as HTMLSpanElement;
    this._priceSlider?.noUiSlider?.on('update', (values: (string | number)[]): void => {
      leftValue.innerHTML = changeCurrencyFormat(values[0] as number);
      rightValue.innerHTML = changeCurrencyFormat(values[1] as number);
    });
  }

  private setBrandFilter(): void {
    const uniqueBrands: Set<string> = new Set<string>();
    this._allProductData.forEach((cardParams: CardParams) => uniqueBrands.add(cardParams.brand));
    const facetValue: TermFacetResult = this._facets?.['brand'] as TermFacetResult;
    const brandContainer: HTMLDivElement = this._element.querySelector('.brand-filter') as HTMLDivElement;
    uniqueBrands.forEach((brandName) => {
      const brandCheckBox: HTMLDivElement = new FilterCheckboxComponent('brand', brandName, facetValue).element;
      brandContainer.append(brandCheckBox);
    });
  }

  private setTypeFilter(): void {
    const uniqueTypes: Set<string> = new Set<string>();
    this._allProductData.forEach((cardParams: CardParams) => uniqueTypes.add(cardParams.type));
    const facetValue: TermFacetResult = this._facets?.['type'] as TermFacetResult;
    const typeContainer: HTMLDivElement = this._element.querySelector('.type-filter') as HTMLDivElement;
    uniqueTypes.forEach((typeName) => {
      const typeCheckBox: HTMLDivElement = new FilterCheckboxComponent('type', typeName, facetValue).element;
      typeContainer.append(typeCheckBox);
    });
  }

  private setKindFilter(): void {
    const uniqueKinds: Set<string> = new Set<string>();
    this._allProductData.forEach((cardParams: CardParams) => uniqueKinds.add(cardParams.kind));
    const facetValue: TermFacetResult = this._facets?.['kind'] as TermFacetResult;
    const kindContainer: HTMLDivElement = this._element.querySelector('.kind-filter') as HTMLDivElement;
    uniqueKinds.forEach((kindName) => {
      const kindCheckBox: HTMLDivElement = new FilterCheckboxComponent('kind', kindName, facetValue).element;
      kindContainer.append(kindCheckBox);
    });
  }

  private async getAllProductData(): Promise<SearchResult> {
    const result: SearchResult = await this._productServices.getAllProductsData().catch((error) => error);
    return result;
  }

  private setResetButton(): void {
    const resetButton: HTMLButtonElement = this._element.querySelector(
      '.products-filter-reset__button'
    ) as HTMLButtonElement;
    resetButton.addEventListener('click', async (e: MouseEvent): Promise<void> => {
      e.preventDefault();
      const formInputs: NodeListOf<HTMLInputElement> = this._element.querySelectorAll('input');
      formInputs.forEach((input: HTMLInputElement): void => {
        switch (input.type) {
          case 'checkbox':
          case 'radio':
            input.checked = false;
        }
        this._priceSlider?.noUiSlider?.set([
          20000 / 100,
          this._allProductData[this._allProductData.length - 1].price / 100,
        ]);
      });
    });
  }

  private setSortingTypeSelect(): void {
    document.addEventListener('DOMContentLoaded', function (): void {
      const elems: NodeListOf<HTMLSelectElement> = document.querySelectorAll('select');
      const instances: M.FormSelect[] = M.FormSelect.init(elems, { classes: 'selected' });
      console.log(instances);
    });
  }

  public createMobileFilterBar(): void {
    const filterBtn: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.button__filter');
    const productList: HTMLDivElement = document.querySelector('.product-list') as HTMLDivElement;
    const backgroundElem: HTMLDivElement = document.querySelector('.background-element') as HTMLDivElement;

    filterBtn.forEach((btn: HTMLButtonElement): void =>
      btn.addEventListener('click', (): void => {
        productList.style.display = 'none';
        backgroundElem.style.display = 'block';
        backgroundElem.style.opacity = '0.7';
        this._element.classList.add('active');
      })
    );

    backgroundElem.addEventListener('click', (): void => {
      productList.style.display = 'block';
      backgroundElem.style.opacity = '1';
      backgroundElem.style.display = 'none';
      this._element.classList.remove('active');
    });
  }

  public get element(): HTMLFormElement {
    return this._element;
  }

  public get filterData(): QueryArgs {
    return this._queryArgs as QueryArgs;
  }
}

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
import { QueryArgs } from '@lib/types/query-args-interface';
import ProductListComponent from '@components/product-list/product-list';
import { FilterCheckboxComponent } from './filter-checkbox/filter-checkbox';

export default class ProductFilterForm {
  private _element: HTMLFormElement;
  private _productServices: ProductServices;
  private _priceSlider: noUiSlider.target;
  private _allProductData: CardParams[];

  constructor() {
    this._element = createElementFromHtml<HTMLFormElement>(teamplate);
    this._productServices = new ProductServices();
    this._priceSlider = {} as noUiSlider.target;
    this._allProductData = [];
    this.setProductFilterForm();
  }

  private async setProductFilterForm(): Promise<void> {
    this._allProductData = await this.getAllProductData();
    console.log(this._allProductData);
    this.createPriceSlider();
    this.setPriceFilter();
    this.setBrandFilter();
    this.setTypeFilter();
    this.setKindFilter();
    this.setResetButton();
    this.setSortingTypeSelect();
    this.setFormSubmitEventHandler();
  }

  private setFormSubmitEventHandler() {
    this._element.addEventListener('submit', async (e: SubmitEvent): Promise<void> => {
      e.preventDefault();
      const priceRange: string[] = this._priceSlider.noUiSlider?.get() as string[];
      const queryArgs: QueryArgs = getFormFieldsAsFilterData(this._element, priceRange);
      this._productServices
        .getProductsDataBySearch(queryArgs)
        .then((res: CardParams[]): void => {
          const productList: HTMLDivElement = this._element.nextElementSibling as HTMLDivElement;
          productList.remove();
          const newProductList: HTMLDivElement = new ProductListComponent(res).element;
          this._element.insertAdjacentElement('afterend', newProductList);
        })
        .catch((error: Error): Error => error);
    });
  }

  private async createPriceSlider(): Promise<void> {
    const slider: noUiSlider.target = this._element.querySelector('.price-slider') as noUiSlider.target;
    noUiSlider.create(slider, {
      start: [20000 / 100, this._allProductData[this._allProductData.length - 1].price / 100],
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

  private setPriceFilter() {
    const leftValue: HTMLSpanElement = this._element.querySelector('.price-ranger__left-value') as HTMLSpanElement;
    const rightValue: HTMLSpanElement = this._element.querySelector('.price-ranger__right-value') as HTMLSpanElement;
    this._priceSlider.noUiSlider?.on('update', (values: (string | number)[]): void => {
      leftValue.innerHTML = changeCurrencyFormat(values[0] as number);
      rightValue.innerHTML = changeCurrencyFormat(values[1] as number);
    });
  }

  private setBrandFilter(): void {
    const uniqueBrands: Set<string> = new Set<string>();
    this._allProductData.forEach((cardParams: CardParams) => uniqueBrands.add(cardParams.brand));
    const brandContainer: HTMLDivElement = this._element.querySelector('.brand-filter') as HTMLDivElement;
    uniqueBrands.forEach((brandName) => {
      const brandCheckBox: HTMLDivElement = new FilterCheckboxComponent('brand', brandName).element;
      brandContainer.append(brandCheckBox);
    });
  }

  private setTypeFilter() {
    const uniqueTypes: Set<string> = new Set<string>();
    this._allProductData.forEach((cardParams: CardParams) => uniqueTypes.add(cardParams.type));
    const typeContainer: HTMLDivElement = this._element.querySelector('.type-filter') as HTMLDivElement;
    uniqueTypes.forEach((typeName) => {
      const typeCheckBox: HTMLDivElement = new FilterCheckboxComponent('type', typeName).element;
      typeContainer.append(typeCheckBox);
    });
  }

  private setKindFilter() {
    const uniqueKinds: Set<string> = new Set<string>();
    this._allProductData.forEach((cardParams: CardParams) => uniqueKinds.add(cardParams.kind));
    const kindContainer: HTMLDivElement = this._element.querySelector('.kind-filter') as HTMLDivElement;
    uniqueKinds.forEach((kindName) => {
      const kindCheckBox: HTMLDivElement = new FilterCheckboxComponent('kind', kindName).element;
      kindContainer.append(kindCheckBox);
    });
  }

  private async getAllProductData(): Promise<CardParams[]> {
    const result: CardParams[] = await this._productServices.getAllProductsData().catch((error) => error);
    return result;
  }

  private setResetButton() {
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
        this._priceSlider.noUiSlider?.set([
          20000 / 100,
          this._allProductData[this._allProductData.length - 1].price / 100,
        ]);
      });
    });
  }

  private setSortingTypeSelect() {
    document.addEventListener('DOMContentLoaded', function (): void {
      const elems: NodeListOf<HTMLSelectElement> = document.querySelectorAll('select');
      const instances: M.FormSelect[] = M.FormSelect.init(elems, { classes: 'selected' });
      console.log(instances);
    });
  }

  public get element(): HTMLFormElement {
    return this._element;
  }
}

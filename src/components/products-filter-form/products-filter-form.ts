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
    this.setColorFilter();
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
    this._allProductData.forEach((item) => uniqueBrands.add(item.brand));
    const brandCheckBox: HTMLDivElement = this._element.querySelector('.brand__wrapper') as HTMLDivElement;
    const brandContainer: HTMLDivElement = this._element.querySelector('.brand-filter') as HTMLDivElement;
    uniqueBrands.forEach((item) => {
      const brandCheckBoxClone: HTMLDivElement = brandCheckBox.cloneNode(true) as HTMLDivElement;

      const brandCheckBoxCloneLabel: HTMLLabelElement = brandCheckBoxClone.querySelector('label') as HTMLLabelElement;
      brandCheckBoxCloneLabel.setAttribute('for', `brand-${item}`);

      const brandCheckBoxCloneInput: HTMLInputElement = brandCheckBoxClone.querySelector('input') as HTMLInputElement;
      brandCheckBoxCloneInput.setAttribute('id', `brand-${item}`);
      brandCheckBoxCloneInput.setAttribute('name', `brand-${item}`);

      const brandCheckBoxSpan: HTMLSpanElement = brandCheckBoxClone.querySelector('span') as HTMLSpanElement;
      brandCheckBoxSpan.innerHTML = item;

      brandCheckBox.remove();

      brandContainer.append(brandCheckBoxClone);
    });
  }

  private setTypeFilter() {
    const uniqueTypes: Set<string> = new Set<string>();
    this._allProductData.forEach((item) => uniqueTypes.add(item.type));
    const typeCheckBox: HTMLDivElement = this._element.querySelector('.type__wrapper') as HTMLDivElement;
    const typeContainer: HTMLDivElement = this._element.querySelector('.type-filter') as HTMLDivElement;
    uniqueTypes.forEach((item) => {
      const typeCheckBoxClone: HTMLDivElement = typeCheckBox.cloneNode(true) as HTMLDivElement;

      const typeCheckBoxCloneLabel: HTMLLabelElement = typeCheckBoxClone.querySelector('label') as HTMLLabelElement;
      typeCheckBoxCloneLabel.setAttribute('for', `type-${item}`);

      const typeCheckBoxCloneInput: HTMLInputElement = typeCheckBoxClone.querySelector('input') as HTMLInputElement;
      typeCheckBoxCloneInput.setAttribute('id', `type-${item}`);
      typeCheckBoxCloneInput.setAttribute('name', `type-${item}`);

      const typeCheckBoxSpan: HTMLSpanElement = typeCheckBoxClone.querySelector('span') as HTMLSpanElement;
      typeCheckBoxSpan.innerHTML = item;

      typeCheckBox.remove();

      typeContainer.append(typeCheckBoxClone);
    });
  }

  private setKindFilter() {
    const uniqueKinds: Set<string> = new Set<string>();
    this._allProductData.forEach((item) => uniqueKinds.add(item.kind));
    const kindCheckBox: HTMLDivElement = this._element.querySelector('.kind__wrapper') as HTMLDivElement;
    const kindContainer: HTMLDivElement = this._element.querySelector('.kind-filter') as HTMLDivElement;
    uniqueKinds.forEach((item) => {
      const kindCheckBoxClone: HTMLDivElement = kindCheckBox.cloneNode(true) as HTMLDivElement;

      const kindCheckBoxCloneLabel: HTMLLabelElement = kindCheckBoxClone.querySelector('label') as HTMLLabelElement;
      kindCheckBoxCloneLabel.setAttribute('for', `kind-${item}`);

      const kindCheckBoxCloneInput: HTMLInputElement = kindCheckBoxClone.querySelector('input') as HTMLInputElement;
      kindCheckBoxCloneInput.setAttribute('id', `kind-${item}`);
      kindCheckBoxCloneInput.setAttribute('name', `kind-${item}`);

      const kindCheckBoxSpan: HTMLSpanElement = kindCheckBoxClone.querySelector('span') as HTMLSpanElement;
      kindCheckBoxSpan.innerHTML = item;

      kindCheckBox.remove();

      kindContainer.append(kindCheckBoxClone);
    });
  }

  private setColorFilter() {
    const colorCheckBox: HTMLDivElement = this._element.querySelector('.color__wrapper') as HTMLDivElement;
    const colorContainer: HTMLDivElement = this._element.querySelector('.color-filter') as HTMLDivElement;
    for (let i = 0; i < 3; i++) {
      const colorCheckBoxClone: HTMLDivElement = colorCheckBox.cloneNode(true) as HTMLDivElement;
      const colorCheckBoxCloneLabel: HTMLLabelElement = colorCheckBoxClone.querySelector('label') as HTMLLabelElement;
      const colorCheckBoxCloneInput: HTMLInputElement = colorCheckBoxClone.querySelector('input') as HTMLInputElement;
      colorCheckBoxCloneLabel.setAttribute('for', `color-${i}`);
      colorCheckBoxCloneInput.setAttribute('id', `color-${i}`);
      colorContainer.append(colorCheckBoxClone);
    }
  }

  private async getAllProductData(): Promise<CardParams[]> {
    const result: CardParams[] = await this._productServices.getAllProductsData().catch((error) => error);
    return result;
  }

  public get element(): HTMLFormElement {
    return this._element;
  }
}

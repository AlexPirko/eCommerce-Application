import './products-filter-form.scss';
import './no-ui-slider/nouislider.scss';
import teamplate from './product-filter-form.html';
import * as noUiSlider from './no-ui-slider/nouislider.js';
import wNumb from 'wnumb';

import ProductServices from '@lib/services/data services/product-services';
import createElementFromHtml from '@lib/utils/create-element-from-html';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';

export default class ProductFilterForm {
  private _element: HTMLFormElement;
  private _productServices: ProductServices;
  private _priceSlider: noUiSlider.target;
  constructor() {
    this._element = createElementFromHtml<HTMLFormElement>(teamplate);
    this._productServices = new ProductServices();
    this._priceSlider = this.createPriceSlider();
    this.setProductFilterForm();
  }

  private setProductFilterForm(): void {
    this.setPriceFilter();
    this.setBrandFilter();
    this.setColorFilter();
  }

  private setFormSubmitEventHandler() {
    this._element.addEventListener('submit', (e) => {
      e.preventDefault();
    });
  }

  private createPriceSlider(): noUiSlider.target {
    const slider: noUiSlider.target = this._element.querySelector('.price-slider') as noUiSlider.target;
    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      step: 1,
      orientation: 'horizontal', // 'horizontal' or 'vertical'
      range: {
        min: 0,
        max: 100,
      },
      format: wNumb({
        decimals: 0,
      }),
    });
    console.log(slider.noUiSlider?.get());

    return slider;
  }

  public setPriceFilter() {
    const leftValue: HTMLSpanElement = this._element.querySelector('.price-ranger__left-value') as HTMLSpanElement;
    const rightValue: HTMLSpanElement = this._element.querySelector('.price-ranger__right-value') as HTMLSpanElement;
    this._priceSlider.noUiSlider?.on('update', (values: (string | number)[]): void => {
      leftValue.innerHTML = changeCurrencyFormat(values[0] as number);
      rightValue.innerHTML = changeCurrencyFormat(values[1] as number);
    });
  }

  public setBrandFilter() {
    const brandCheckBox: HTMLDivElement = this._element.querySelector('.brand__wrapper') as HTMLDivElement;
    const brandContainer: HTMLDivElement = this._element.querySelector('.brand-filter') as HTMLDivElement;
    for (let i = 1; i < 3; i++) {
      const brandCheckBoxClone: HTMLDivElement = brandCheckBox.cloneNode(true) as HTMLDivElement;
      const brandCheckBoxCloneLabel: HTMLLabelElement = brandCheckBoxClone.querySelector('label') as HTMLLabelElement;
      const brandCheckBoxCloneInput: HTMLInputElement = brandCheckBoxClone.querySelector('input') as HTMLInputElement;
      brandCheckBoxCloneLabel.setAttribute('for', `brand-${i}`);
      brandCheckBoxCloneInput.setAttribute('id', `brand-${i}`);
      brandContainer.append(brandCheckBoxClone);
    }
  }

  public setColorFilter() {
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

  public get element(): HTMLFormElement {
    return this._element;
  }
}

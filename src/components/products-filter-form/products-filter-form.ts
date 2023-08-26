import './products-filter-form.scss';

import ProductServices from '@lib/services/data services/product-services';
import createHTMLElement from '@lib/utils/create-html-element';

export default class ProductFilterForm {
  private _element: HTMLFormElement;
  private _productServices: ProductServices;
  constructor() {
    this._element = createHTMLElement('form', ['products-filter-form']);
    this._productServices = new ProductServices();
    this.setProductFilterForm();
  }

  private setProductFilterForm(): void {
    this._element.addEventListener('submit', (e) => {
      e.preventDefault();
    });
    this._element.append(this.getProductsButton());
  }

  private getProductsButton(): HTMLButtonElement {
    const button: HTMLButtonElement = createHTMLElement('button', [
      'products-filter-form__button',
      'btn',
      'waves-effect',
      'waves-light',
    ]);
    button.innerHTML = 'getProductsData';
    button.addEventListener('mouseup', async (event) => {
      event.preventDefault();
      try {
        const productsData = await this._productServices.getPageProductsData(10, 0);
        console.log(productsData);
      } catch (error) {
        console.log(error);
      }
    });
    console.log(button);
    return button;
  }

  public get element(): HTMLFormElement {
    return this._element;
  }
}

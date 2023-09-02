// import { FIRST_PAGE_NUMBER, PRODUCTS_PER_PAGE } from '@lib/constants/product-list-constants';
import './products-filter-form.scss';

import ProductServices from '@lib/services/data services/product-services';
import createHTMLElement from '@lib/utils/create-html-element';
// import { CardParams } from '@lib/types/params-interface';

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
    // this._element.append(this.getProductsButton());
  }

  // private getProductsButton(): HTMLButtonElement {
  //   const button: HTMLButtonElement = createHTMLElement('button', [
  //     'products-filter-form__button',
  //     'btn',
  //     'waves-effect',
  //     'waves-light',
  //   ]);
  //   button.innerHTML = 'getProductsData';
  //   button.addEventListener('mouseup', async (event) => {
  //     event.preventDefault();
  //     try {
  //       const productsData: CardParams[] = await this._productServices.getPageProductsData(
  //         PRODUCTS_PER_PAGE,
  //         FIRST_PAGE_NUMBER
  //       );
  //       console.log(productsData);
  //       const product: CardParams = await this._productServices.getProductByKey('c-r6');
  //       console.log(product);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   });
  //   return button;
  // }

  public get element(): HTMLFormElement {
    return this._element;
  }
}

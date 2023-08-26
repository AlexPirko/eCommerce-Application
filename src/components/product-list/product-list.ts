import './product-list.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import ProductCard from './product-card/product-card';
import ProductServices from '@lib/services/data services/product-services';
import { CardParams } from '@lib/types/params-interface';

export default class ProductList {
  private _element: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  constructor() {
    this._element = createHTMLElement<HTMLDivElement>('div', ['product-list']);
    this._cardsPerPage = 10;
    this._pageNumber = 1;
    this.setProductList();
  }

  private async setProductList() {
    const productServices: ProductServices = new ProductServices();
    const productListData: CardParams = await productServices
      .getPageProductsData(this._cardsPerPage, this._pageNumber)
      .catch((error) => error);
    console.log(productListData);
    for (let i: number = 0; i < this._cardsPerPage; i++) {
      const productCard: ProductCard = new ProductCard();
      this._element.append(productCard.element);
    }
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

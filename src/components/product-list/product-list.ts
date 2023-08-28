import './product-list.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import ProductCard from './product-card/product-card';
import ProductServices from '@lib/services/data services/product-services';
import { CardParams } from '@lib/types/params-interface';
import { FIRST_PAGE_NUMBER, PRODUCTS_PER_PAGE } from '@lib/constants/product-list-constants';

export default class ProductListComponent {
  private _element: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;

  constructor() {
    this._element = createHTMLElement<HTMLDivElement>('div', ['product-list']);
    this._cardsPerPage = PRODUCTS_PER_PAGE;
    this._pageNumber = FIRST_PAGE_NUMBER;
    this.setProductList();
  }

  private async setProductList(): Promise<void> {
    localStorage.removeItem('pageNumber');
    const productServices: ProductServices = new ProductServices();
    const cardsParams: CardParams[] = await productServices
      .getPageProductsData(this._cardsPerPage, this._pageNumber)
      .catch((error) => error);

    for (let i: number = 0; i < this._cardsPerPage; i++) {
      const productCard: ProductCard = new ProductCard(cardsParams[i]);
      this._element.append(productCard.element);
    }
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

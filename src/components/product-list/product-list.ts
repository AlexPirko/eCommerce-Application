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
  private _cardsData: CardParams[] | undefined;

  constructor(cardsData?: CardParams[]) {
    this._element = createHTMLElement<HTMLDivElement>('div', ['product-list']);
    this._cardsPerPage = PRODUCTS_PER_PAGE;
    this._pageNumber = FIRST_PAGE_NUMBER;
    this._cardsData = cardsData;
    this.setProductList();
  }

  private async setProductList(): Promise<void> {
    localStorage.removeItem('pageNumber');
    if (!this._cardsData) {
      const productServices: ProductServices = new ProductServices();
      this._cardsData = await productServices
        .getPageProductsData(this._cardsPerPage, this._pageNumber)
        .catch((error) => error);
    }

    if (this._cardsData)
      for (let i: number = 0; i < this._cardsData.length; i++) {
        const productCard: ProductCard = new ProductCard(this._cardsData[i]);
        this._element.append(productCard.element);
      }
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

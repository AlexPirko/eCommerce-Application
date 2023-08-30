import './detailed-card.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import { CardParams, Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ProductServices from '@lib/services/data services/product-services';

export default class DetailedCard extends ComponentView {
  protected detailedCardContainer: HTMLElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  data: CardParams[] | undefined;

  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['section-cart'],
      text: '',
      callback: null,
    };
    super(params);

    this._cardsPerPage = 500;
    this._pageNumber = 1;

    this.detailedCardContainer = createHTMLElement('div', ['detailed-cart', 'row']);
    this.getPromise();
  }

  private async getPromise(): Promise<void> {
    const productServices: ProductServices = new ProductServices();
    const cardsParams: CardParams[] = await productServices
      .getPageProductsData(this._cardsPerPage, this._pageNumber)
      .catch((error) => error);
    this.data = cardsParams;
    this.configureView();
  }

  private createDetailedCartHtml(): string {
    return `
      <div class='row top-bar'>
        <div class='col s12 m6 l7 breadcrumbs'>
          <ul class='breadcrumbs-list'>
            <li><a href="#!" class="breadcrumb-item">First</a></li>
            <li>>></li>
            <li><a href="#!" class="breadcrumb-item">Second</a></li>
            <li>>></li>
            <li><a href="#!" class="breadcrumb-item">Third</a></li>
          </ul>
        </div>
        <div class='btn-container col s12 m6 l5'>
            <div class='detail-price'>Price: ${this.data?.[0].price}$</div>
            <div class='detail-buttons'>
              <button class='waves-effect waves-light btn-small add-button'><i class="menu-cart material-icons">shopping_cart</i>Add to Cart</button>
            </div>
        </div>
      </div>
      <div class='col s12 m6 l7 product-info'>
        <div class='product-info-container'>
          <h2 class='product-details-name'>${this.data?.[0].name}</h2>
          <p class='detail-info'>Brand: <span>${this.data?.[0].brand}</span></p>
          <p class='detail-description'>${this.data?.[0].description}</p>
        </div>
      </div>
      <div class='col s6 l5 product-images'></div>
    `;
  }

  private createSlider(): HTMLElement {
    const slider: HTMLDivElement = createHTMLElement('div', ['slider']);
    const html: string = `
      <div class="carousel carousel-slider center">
        <div class="carousel-fixed-item center">          
        </div>
        <div class="carousel-item" href="#one!">
          <img src=${this.data?.[2].imgUrls[1]}>
        </div>
        <div class="carousel-item" href="#two!">
          <img src=${this.data?.[2].imgUrls[2]}>
        </div>
        <div class="carousel-item" href="#three!">
          <img src=${this.data?.[2].imgUrls[3]}>
        </div>
        <div class="carousel-item" href="#four!">
          <img src=${this.data?.[2].imgUrls[0]}>
        </div>
      </div>      
    `;
    slider.innerHTML = html;
    return slider;
  }

  private configureView(): void {
    this.detailedCardContainer.innerHTML = this.createDetailedCartHtml();
    this.detailedCardContainer.lastElementChild?.append(this.createSlider());

    const el: HTMLElement = this.createSlider().firstElementChild as HTMLElement;
    this.sliderInit(el);
  }

  sliderInit(el: HTMLElement) {
    M.AutoInit();

    M.Carousel.init(el, {
      indicators: true,
    });
  }

  public getElement(): HTMLElement {
    return this.detailedCardContainer;
  }
}

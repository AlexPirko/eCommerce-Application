import './detailed-card.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import { CardParams, Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ProductServices from '@lib/services/data services/product-services';

export default class DetailedCard extends ComponentView {
  protected detailedCardContainer: HTMLElement;
  protected slider: HTMLElement;
  protected imageModal: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  protected data: CardParams[] | undefined;

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
    this.slider = createHTMLElement('div', ['slider']);
    this.imageModal = createHTMLElement('div', ['image-modal']);
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

  private createCarousel(): string {
    return `
      <div class="carousel carousel-slider center">
        <div class="carousel-item" id='1' href="#one!">
          <img class="modal-image" src=${this.data?.[2].imgUrls[1]}>
        </div>
        <div class="carousel-item" id='2' href="#two!">
          <img class="modal-image" src=${this.data?.[2].imgUrls[2]}>
        </div>
        <div class="carousel-item" id='3' href="#three!">
          <img class="modal-image" src=${this.data?.[2].imgUrls[3]}>
        </div>
        <div class="carousel-item" id='0' href="#four!">
          <img class="modal-image" src=${this.data?.[2].imgUrls[0]}>
        </div>
      </div>      
    `;
  }

  private configureView(): void {
    this.detailedCardContainer.innerHTML = this.createDetailedCartHtml();
    this.detailedCardContainer.lastElementChild?.append(this.createMainSlider());
    this.createImageModal();

    const carousel: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel') as NodeListOf<HTMLElement>;
    this.imageModalInit(carousel[0]);
    this.mainSliderInit(carousel[1]);
  }

  private modalSliderInit(el: HTMLElement): void {
    M.Carousel.init(el, {
      indicators: true,
    });
  }

  private mainSliderInit(el: HTMLElement): void {
    M.AutoInit();
    M.Carousel.init(el, {
      indicators: true,
    });
  }

  private imageModalInit(el: HTMLElement): void {
    const carousel: HTMLElement = this.slider.firstElementChild as HTMLElement;
    const carouselItem: HTMLCollection = carousel.children;
    for (const item of carouselItem) {
      item.addEventListener('click', (event: Event) => {
        event.preventDefault();
        if (event?.target) {
          this.toggleModal();
          this.modalSliderInit(el);
        }
      });
    }
  }

  private toggleModal(): void {
    const backgroundElem: HTMLDivElement = document.querySelector('.background-element') as HTMLDivElement;
    backgroundElem.style.opacity = '0.7';
    this.imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    backgroundElem.style.display = 'block';
  }

  private createImageModal(): void {
    const imageModalWrapper: HTMLDivElement = createHTMLElement('div', ['image-modal_wrapper']);
    const closeBtnWrapper: HTMLDivElement = createHTMLElement('div', ['close-btn_wrapper']);
    const closeBtn: HTMLButtonElement = createHTMLElement('button', ['close-btn']);
    const backgroundElem: HTMLDivElement = document.querySelector('.background-element') as HTMLDivElement;

    imageModalWrapper.innerHTML = this.createCarousel();
    closeBtn.innerHTML = `<i class="medium material-icons">close</i>`;

    closeBtnWrapper.append(closeBtn);
    imageModalWrapper.append(closeBtnWrapper);
    this.imageModal.append(imageModalWrapper);

    document.body.prepend(this.imageModal);

    closeBtn.addEventListener('click', () => {
      this.imageModal.style.display = 'none';
      document.body.style.overflow = '';
      backgroundElem.style.opacity = '1';
      backgroundElem.style.display = 'none';
    });
  }

  private createMainSlider(): HTMLElement {
    this.slider.innerHTML = this.createCarousel();
    return this.slider;
  }

  public getElement(): HTMLElement {
    return this.detailedCardContainer;
  }
}

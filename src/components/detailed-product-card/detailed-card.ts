import './detailed-card.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';
import { CardParams, Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ProductServices from '@lib/services/data services/product-services';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';

export default class DetailedCard extends ComponentView {
  protected detailedCardContainer: HTMLDivElement;
  protected slider: HTMLDivElement;
  protected imageModal: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  protected data: CardParams[] | undefined;
  protected key: string;
  protected params: CardParams | undefined;

  constructor(key: string) {
    const params: Params = {
      tagName: 'section',
      classNames: ['section-cart'],
      text: '',
      callback: null,
    };
    super(params);

    this._cardsPerPage = 500;
    this._pageNumber = 1;
    this.key = key;

    this.detailedCardContainer = createHTMLElement('div', ['detailed-cart', 'row']);
    this.slider = createHTMLElement('div', ['slider']);
    this.checkModal();
    this.imageModal = createHTMLElement('div', ['image-modal']);
    this.getPromise();
  }

  private checkModal(): void {
    const previousModal: HTMLDivElement = document.querySelector('.image-modal') as HTMLDivElement;
    if (previousModal) {
      previousModal.remove();
    }
  }

  private async getPromise(): Promise<void> {
    const productServices: ProductServices = new ProductServices();
    const cardsParams: CardParams[] = await productServices
      .getPageProductsData(this._cardsPerPage, this._pageNumber)
      .catch((error) => error);
    this.data = cardsParams;
    this.params = this.data?.find((item) => item.key === this.key);
    this.configureView();
  }

  private createDetailedCardHtml(): string {
    let price: string = '';
    let oldPrice: string = '';
    if (this.params?.discount) {
      price = changeCurrencyFormat(this.params?.discount / 100);
      oldPrice = changeCurrencyFormat(this.params?.price / 100);
    }
    if (!this.params?.discount && this.params?.price) {
      price = changeCurrencyFormat(this.params?.price / 100);
    }

    return `
      <div class='row top-bar'>
        <div class='col s12 m6 l7 button-to-catalog-container'>
          <button class='waves-effect waves-light btn-small button-to-catalog'><i class="menu-cart material-icons">subdirectory_arrow_left</i>Back</button>
        </div>
        <div class='btn-container col s12 m6 l5'>
            <div class='price-container'>
              <div class='detail-price'>${price}</div>
              <div class='detail-old-price'>${oldPrice}</div>
            </div>
            <div class='detail-buttons'>
              <button class='waves-effect waves-light btn-small add-button'><i class="menu-cart material-icons">shopping_cart</i>Add to Cart</button>
            </div>
        </div>
      </div>
      <div class='col s12 m6 l7 product-info'>
        <div class='product-info-container'>
          <h2 class='product-details-name'>${this.params?.name}</h2>
          <p class='detail-info'>Brand: <span>${this.params?.brand}</span></p>
          <p class='detail-description'>${this.params?.description}</p>
        </div>
      </div>
      <div class='col s6 l5 product-images'></div>
    `;
  }

  private createCarousel(): string {
    return `
      <div class="carousel carousel-slider center">
        <div class="carousel-item" id='1' href="#one!">
          <img class="modal-image" src=${this.params?.imgUrls[0]}>
        </div>
        <div class="carousel-item" id='2' href="#two!">
          <img class="modal-image" src=${this.params?.imgUrls[1]}>
        </div>
        <div class="carousel-item" id='3' href="#three!">
          <img class="modal-image" src=${this.params?.imgUrls[2]}>
        </div>
        <div class="carousel-item" id='0' href="#four!">
          <img class="modal-image" src=${this.params?.imgUrls[3]}>
        </div>
      </div>      
    `;
  }

  private configureView(): void {
    this.detailedCardContainer.innerHTML = this.createDetailedCardHtml();
    this.detailedCardContainer.lastElementChild?.append(this.createMainSlider());
    this.createImageModal();

    const carousel: NodeListOf<HTMLElement> = document.querySelectorAll('.carousel') as NodeListOf<HTMLElement>;
    this.imageModalInit(carousel[0]);
    this.mainSliderInit(carousel[1]);
    this.backToCatalog();
  }

  private mainSliderInit(el: HTMLElement): void {
    M.AutoInit();
    M.Carousel.init(el, {
      indicators: true,
    });
  }

  private modalSliderInit(el: HTMLElement): void {
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

  private createMainSlider(): HTMLDivElement {
    this.slider.innerHTML = this.createCarousel();
    return this.slider;
  }

  private backToCatalog(): void {
    const router: Router = new Router(null);
    const btnToCatalog: HTMLButtonElement = document.querySelector('.button-to-catalog') as HTMLButtonElement;
    btnToCatalog.addEventListener('click', (): void => {
      router.navigate(`${Paths.CATALOG}`);
    });
  }

  public getElement(): HTMLDivElement {
    return this.detailedCardContainer;
  }
}

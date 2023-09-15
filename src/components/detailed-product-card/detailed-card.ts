import './detailed-card.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import { changeCurrencyFormat } from '@lib/utils/change-currency-format';
import changeCartCount from '@layouts/header/header-link/header-cart-count';
import { CardParams, Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ProductServices from '@lib/services/data services/product-services';
import { Paths } from '@components/router/paths';
import Router from '@components/router/router';
import M from 'materialize-css';
import ApiServices from '@lib/api/api-services';
import { LineItem } from '@commercetools/platform-sdk';
import { getCartResponseAsCardData } from '@lib/utils/get-product-data';

export default class DetailedCard extends ComponentView {
  protected detailedCardContainer: HTMLDivElement;
  protected slider: HTMLDivElement;
  protected imageModal: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  protected data: CardParams[] | undefined;
  protected key: string;
  protected params: CardParams | undefined;
  public _isInCart: boolean;

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
    this._isInCart = false;

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
    this.handleAddToCartButton();
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
              <button class='waves-effect waves-light btn-small add-button' data-id=${this.params?.key}><i class="menu-cart material-icons">add_shopping_cart</i>Add</button>
              <button class='waves-effect waves-light btn-small del-button' data-id=${this.params?.key}><i class="menu-cart material-icons">remove_shopping_cart</i>Del</button>
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
      <div class='col s12 m6 l5 product-images'></div>
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
      duration: 400,
    });
  }

  private modalSliderInit(el: HTMLElement): void {
    M.Carousel.init(el, {
      indicators: true,
      duration: 200,
    });
  }

  private imageModalInit(el: HTMLElement): void {
    const carousel: HTMLElement = this.slider.firstElementChild as HTMLElement;
    const carouselItem: HTMLCollection = carousel.children;
    for (const item of carouselItem) {
      if (item) {
        item.addEventListener('click', (event: Event | MouseEvent): void => {
          event.preventDefault();
          if (event?.target) {
            this.toggleModal();
            this.modalSliderInit(el);
          }
        });
      }
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

    closeBtn.addEventListener('click', (): void => {
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

  private async handleAddToCartButton(): Promise<void> {
    const addBtn: HTMLButtonElement = document.querySelector('.add-button') as HTMLButtonElement;
    const delBtn: HTMLButtonElement = document.querySelector('.del-button') as HTMLButtonElement;
    const sku: string | undefined = this.params?.sku;

    delBtn.disabled = true;
    const api: ApiServices = new ApiServices();
    await api
      .getActiveCart()
      .then((res) => {
        res.body.lineItems.forEach((item: LineItem) => {
          if (addBtn.dataset.id === item.productKey) addBtn.disabled = true;
          if (delBtn.dataset.id === item.productKey) delBtn.disabled = false;
        });
      })
      .catch((error) => error);

    addBtn?.addEventListener('click', async (): Promise<void> => {
      addBtn.disabled = true;
      delBtn.disabled = false;
      api
        .getActiveCart()
        .then(async (res): Promise<void> => {
          await api
            .updateCart(res.body.id, { version: res.body.version, actions: [{ action: 'addLineItem', sku: sku }] })
            .then(() => changeCartCount())
            .catch((error) => error);
        })
        .catch(async (error) => {
          await api.createCart({ currency: 'USD', lineItems: [{ sku: sku }] }).catch((error) => error);
          return error;
        });
    });

    delBtn?.addEventListener('click', async (): Promise<void> => {
      delBtn.disabled = true;
      addBtn.disabled = false;
      api
        .getActiveCart()
        .then(async (res): Promise<void> => {
          const { lineItemId } = res.body.lineItems
            .map((item: LineItem): CardParams => getCartResponseAsCardData(item))
            .filter((cartProductData) => cartProductData.sku === sku)[0];
          await api
            .updateCart(res.body.id, {
              version: res.body.version,
              actions: [{ action: 'removeLineItem', lineItemId: lineItemId }],
            })
            .then(() => changeCartCount())
            .catch((error) => error);
        })
        .catch(async (error) => {
          return error;
        });
    });
  }

  private backToCatalog(): void {
    const router: Router = new Router(null);
    const btnToCatalog: HTMLButtonElement = document.querySelector('.button-to-catalog') as HTMLButtonElement;
    if (btnToCatalog) {
      btnToCatalog.addEventListener('click', (): void => {
        router.navigate(`${Paths.CATALOG}`);
      });
    }
  }

  public getElement(): HTMLDivElement {
    return this.detailedCardContainer;
  }
}

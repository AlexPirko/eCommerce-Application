import './product-list.scss';

import createHTMLElement from '@lib/utils/create-html-element';
import ProductCard from './product-card/product-card';
import ProductServices from '@lib/services/data services/product-services';
import { CardParams } from '@lib/types/params-interface';
import { FIRST_PAGE_NUMBER, PRODUCTS_PER_PAGE } from '@lib/constants/product-list-constants';
import { Cart, ClientResponse, LineItem } from '@commercetools/platform-sdk';
import ApiServices from '@lib/api/api-services';
import ProductFilterForm from '@components/products-filter-form/products-filter-form';

export default class ProductListComponent {
  private _element: HTMLDivElement;
  private _cardsPerPage: number;
  private _pageNumber: number;
  private _cardsData: CardParams[] | undefined;
  private _api: ApiServices;
  private _filterForm: ProductFilterForm;

  constructor(cardsData?: CardParams[]) {
    this._element = createHTMLElement<HTMLDivElement>('div', ['product-list']);
    this._cardsPerPage = PRODUCTS_PER_PAGE;
    this._pageNumber = FIRST_PAGE_NUMBER;
    this._cardsData = cardsData;
    this._api = new ApiServices();
    this._filterForm = new ProductFilterForm();
    this.setProductList();
  }

  private async setProductList(): Promise<void> {
    let cartSku: Record<string, boolean> = {};
    this._api
      .getActiveCart()
      .then(async (res: ClientResponse<Cart>): Promise<void> => {
        cartSku = res.body.lineItems.reduce(
          (acc: Record<string, boolean>, item: LineItem): Record<string, boolean> => {
            const currentSku: string = item.variant.sku as string;
            acc[currentSku] = true;
            return acc;
          },
          {} as Record<string, boolean>
        );
        feeedProductList();
      })
      .catch((error) => {
        feeedProductList();
        error;
      });
    const feeedProductList: () => Promise<void> = async (): Promise<void> => {
      if (!this._cardsData) {
        const productServices: ProductServices = new ProductServices();
        productServices
          .getPageProductsData(this._cardsPerPage, this._pageNumber)
          .then((result) => {
            this._cardsData = result;
            this._cardsData.forEach((item: CardParams): void => {
              const productCard: ProductCard = new ProductCard(item, cartSku[item.sku]);
              this._element.append(productCard.element);
            });
          })
          .then(async () => await this.createMobileFilterBar())
          .catch((error) => error);
      } else {
        this._cardsData.forEach((item: CardParams): void => {
          const productCard: ProductCard = new ProductCard(item, cartSku[item.sku]);
          this._element.append(productCard.element);
        });
        await this.createMobileFilterBar();
      }
    };
  }

  public async createMobileFilterBar(): Promise<void> {
    const filterBtn: NodeListOf<HTMLButtonElement> | null = this._element.querySelectorAll('.button__filter');
    const backgroundElem: HTMLDivElement = document.querySelector('.background-element') as HTMLDivElement;
    filterBtn.forEach((btn: HTMLButtonElement): void => {
      btn.addEventListener('click', (): void => {
        this._element.style.display = 'none';
        backgroundElem.style.display = 'block';
        backgroundElem.style.opacity = '0.7';
        this._filterForm.element.classList.add('active');
      });
    });
    backgroundElem.addEventListener('click', (): void => {
      this._element.style.display = 'block';
      backgroundElem.style.opacity = '1';
      backgroundElem.style.display = 'none';
      this._filterForm.element.classList.remove('active');
    });
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

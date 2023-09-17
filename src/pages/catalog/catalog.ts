import './catalog.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import ProductFilterForm from '@components/products-filter-form/products-filter-form';
import ProductListComponent from '@components/product-list/product-list';
import CatalogPaginationComponent from '@components/pagination-nav/pagination-nav';
import DetailedCard from '@components/detailed-product-card/detailed-card';
import createHTMLElement from '@lib/utils/create-html-element';
import { FIRST_PAGE_NUMBER } from '@lib/constants/product-list-constants';

export default class Catalog extends ComponentView {
  private filterForm: ProductFilterForm;
  private productList: ProductListComponent;
  private pageNav: CatalogPaginationComponent;

  constructor(key: string = '') {
    const params: Params = {
      tagName: 'section',
      classNames: ['catalog-page'],
      text: '',
      callback: null,
    };
    super(params);

    this.productList = new ProductListComponent();
    this.filterForm = new ProductFilterForm();
    this.pageNav = new CatalogPaginationComponent(FIRST_PAGE_NUMBER);

    if (key) {
      const detailedCard: DetailedCard = new DetailedCard(key);
      this.viewElementBuilder.addInnerElement(detailedCard.getElement());
    } else {
      this.configureCatalogView();
    }
  }

  private configureCatalogView(): void {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['catalog-title'],
      text: 'Catalog',
    };
    const productListContainer: HTMLDivElement = createHTMLElement<HTMLDivElement>('div', ['product-list__container']);
    productListContainer.append(this.filterForm.element, this.pageNav.element);

    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElementBuilder.addInnerElement(titleElementBuilder);
    this.viewElementBuilder.addInnerElement(productListContainer);
  }
}

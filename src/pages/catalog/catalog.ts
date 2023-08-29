import './catalog.scss';

import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import ProductFilterForm from '@components/products-filter-form/products-filter-form';
import ProductListComponent from '@components/product-list/product-list';
import CatalogPaginationComponent from '@components/pagination-nav/pagination-nav';
import Router from '@components/router/router';

export default class Catalog extends ComponentView {
  private filterForm: ProductFilterForm;
  private productList: ProductListComponent;
  private pageNav: CatalogPaginationComponent;

  constructor(key: string = '', router: Router) {
    const params: Params = {
      tagName: 'section',
      classNames: ['catalog-page'],
      text: '',
      callback: null,
    };
    super(params);

    this.productList = new ProductListComponent();
    this.filterForm = new ProductFilterForm();
    this.pageNav = new CatalogPaginationComponent(1);

    if (key) {
      console.log(key /* Здесь будет функция инициализирующая создание страницы с детальной инфо detailedCard()*/);
    } else {
      console.log(router /* Здесь будет функция инициализирующая создание страниц с картами товров*/);
    }

    this.configureView();
  }

  private configureView(): void {
    const titleParams: Params = {
      tagName: 'h2',
      classNames: ['catalog-title'],
      text: 'Catalog',
    };
    const titleElementBuilder: ElementBuilder = new ElementBuilder(titleParams);

    this.viewElementBuilder.addInnerElement(titleElementBuilder);
    this.viewElementBuilder.addInnerElement(this.filterForm.element);
    this.viewElementBuilder.addInnerElement(this.productList.element);
    this.viewElementBuilder.addInnerElement(this.pageNav.element);
  }
}

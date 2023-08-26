import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import ProductFilterForm from '@components/products-filter-form/products-filter-form';

export default class Catalog extends ComponentView {
  private filterForm: ProductFilterForm;

  constructor() {
    const params: Params = {
      tagName: 'section',
      classNames: ['catalog-page'],
      text: '',
      callback: null,
    };
    super(params);
    this.filterForm = new ProductFilterForm();
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
  }
}

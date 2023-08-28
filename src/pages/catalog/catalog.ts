import { Params } from '@lib/types/params-interface';
import ComponentView from '@lib/services/component-view';
import ElementBuilder from '@lib/services/element-builder';
import Router from '@components/router/router';

export default class Catalog extends ComponentView {
  constructor(key: string = '', router: Router) {
    const params: Params = {
      tagName: 'section',
      classNames: ['catalog-page'],
      text: '',
      callback: null,
    };
    super(params);

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
  }
}

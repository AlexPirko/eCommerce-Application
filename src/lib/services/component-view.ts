import { Params } from '@lib/types/params-interface';
import ElementBuilder from './element-builder';

export default abstract class ComponentView {
  elementBuilder: ElementBuilder;

  constructor(params: Params) {
    this.elementBuilder = this.createView(params);
  }

  getHtmlElement(): HTMLElement | null {
    return this.elementBuilder.getElement();
  }

  createView(params: Params) {
    const elParams = {
      tagName: params.tagName,
      classNames: params.classNames,
      callback: params.callback,
      text: params.text,
    };
    this.elementBuilder = new ElementBuilder(elParams);

    return this.elementBuilder;
  }
}

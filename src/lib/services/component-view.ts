import { Params } from '@lib/types/params-interface';
import ElementBuilder from './element-builder';

export default abstract class ComponentView {
  public viewElement: ElementBuilder;

  constructor(params: Params) {
    this.viewElement = this.createView(params);
  }

  public getHtmlElement(): HTMLElement | null {
    return this.viewElement.getElement();
  }

  public createView(params: Params): ElementBuilder {
    const elParams: Params = {
      tagName: params.tagName,
      classNames: params.classNames,
      callback: params.callback,
      text: params.text,
    };
    this.viewElement = new ElementBuilder(elParams);

    return this.viewElement;
  }
}

import { Params } from '@lib/types/params-interface';
import ElementBuilder from './element-builder';

export default abstract class ComponentView {
  protected viewElementBuilder: ElementBuilder;

  constructor(params: Params) {
    this.viewElementBuilder = new ElementBuilder(params);
  }

  public getHtmlElement(): HTMLElement | null {
    return this.viewElementBuilder.getElement();
  }
}

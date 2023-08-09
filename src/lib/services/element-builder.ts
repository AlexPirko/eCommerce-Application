import { Params } from '@lib/types/params-interface';

export default class ElementBuilder {
  protected _element: HTMLElement | null;

  constructor(params: Params) {
    this._element = null;
    this.setElement(params);
  }

  addInnerElement(element: ElementBuilder) {
    if (element instanceof ElementBuilder) {
      this._element?.append(element.getElement() as HTMLElement);
    } else {
      this._element?.append(element);
    }
  }

  protected setElement(params: Params): void {
    this._element = document.createElement(params.tagName);
    this._element.classList.add(...params.classNames);
    if (params.callback) {
      this._element.addEventListener('click', params.callback);
    }
    if (params.text) {
      this._element.innerHTML = params.text;
    }
  }

  public getElement(): HTMLElement | null {
    return this._element;
  }
}

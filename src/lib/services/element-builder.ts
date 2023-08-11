import { Params } from '@lib/types/params-interface';

export default class ElementBuilder {
  protected _element: HTMLElement;

  constructor(params: Params) {
    this._element = document.createElement(params.tagName);
    this.setElement(params);
  }

  protected setElement(params: Params): void {
    this._element.classList.add(...params.classNames);
    if (params.callback) {
      this._element.addEventListener('click', () => params.callback?.());
    }
    if (params.text) {
      this._element.innerHTML = params.text;
    }
  }

  public addInnerElement(_element: ElementBuilder | HTMLElement): void {
    if (_element instanceof ElementBuilder) {
      this._element.append(_element.getElement() as HTMLElement);
    } else {
      this._element.append(_element);
    }
  }

  public getElement(): HTMLElement {
    return this._element;
  }
}

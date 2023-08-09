import { Params } from '@lib/types/params-interface';

export default abstract class ComponentContainer {
  protected _element: HTMLElement;
  constructor(params: Params) {
    this._element = ComponentContainer.createElement(params.tagName);
    this.setClasses(params.classNames);
    this.addComponents(params.components);
  }

  protected static createElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  protected setClasses(classNames: string[]): void {
    this._element.classList.add(...classNames);
  }

  protected addComponents(components: HTMLElement[] | undefined): void {
    if (components) components.forEach((component) => this._element.append(component));
  }

  public get element(): HTMLElement {
    return this._element;
  }
}

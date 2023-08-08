import createElementFromHtml from '@lib/utils/create-element-from-html';

export default abstract class ComponentFromHtmlTemplate {
  protected readonly _element: HTMLElement;

  constructor(htmlTeamplate: string) {
    this._element = ComponentFromHtmlTemplate.createElemntFrom(htmlTeamplate);
  }

  private static createElemntFrom(template: string): HTMLElement {
    return createElementFromHtml(template);
  }

  public get element(): HTMLElement {
    return this._element;
  }
}

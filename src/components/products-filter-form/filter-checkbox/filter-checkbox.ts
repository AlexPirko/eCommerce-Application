import { TermFacetResult } from '@commercetools/platform-sdk';
import teamplate from './filter-checkbox.html';
import createElementFromHtml from '@lib/utils/create-element-from-html';

export class FilterCheckboxComponent {
  private _element: HTMLDivElement;

  constructor(attributeName: string, attributeValue: string, facet: TermFacetResult) {
    this._element = createElementFromHtml<HTMLDivElement>(teamplate);
    this.setCheckbox(attributeName, attributeValue, facet);
  }

  private setCheckbox(attributeName: string, attributeValue: string, facet: TermFacetResult) {
    const label: HTMLLabelElement = this._element.querySelector('label') as HTMLLabelElement;
    label.setAttribute('for', `${attributeName}-${attributeValue}`);

    const input: HTMLInputElement = this._element.querySelector('input') as HTMLInputElement;
    input.classList.add(`${attributeName}`);
    input.setAttribute('id', `${attributeName}-${attributeValue}`);
    input.setAttribute('name', `${attributeName}-${attributeValue}`);

    const span: HTMLSpanElement = label.querySelector('span') as HTMLSpanElement;
    span.innerHTML = attributeValue;

    const countSpan: HTMLSpanElement = this._element.querySelector('.facet-count') as HTMLSpanElement;
    const count: number = facet.terms.filter((item) => item.term === attributeValue)[0]?.count;
    countSpan.innerHTML = `(${count})`;
  }

  public get element(): HTMLDivElement {
    return this._element;
  }
}

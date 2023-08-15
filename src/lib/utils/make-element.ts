export default function makeElement(elem: string, className: string[]): HTMLElement {
  const element: HTMLElement = document.createElement(elem);
  element.classList.add(...className);
  return element;
}

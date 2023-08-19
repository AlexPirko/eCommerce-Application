export default function createHTMLElement<T>(elem: string, className: string[], attribute?: Record<string, string>): T {
  const element: HTMLElement = document.createElement(elem);
  element.classList.add(...className);
  if (attribute) Object.keys(attribute).forEach((item) => element.setAttribute(item, attribute.item));
  return element as T;
}

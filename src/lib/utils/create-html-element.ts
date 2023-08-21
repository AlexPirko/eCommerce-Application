export default function createHTMLElement<T>(
  elem: string,
  classNames: string[],
  attribute?: Record<string, string>
): T {
  const element: HTMLElement = document.createElement(elem);
  element.classList.add(...classNames);
  if (attribute) Object.keys(attribute).forEach((item) => element.setAttribute(item, attribute.item));
  return element as T;
}

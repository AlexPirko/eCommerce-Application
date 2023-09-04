export default function createElementFromHtml<T>(innerHtml: string): T {
  const tempContainer: HTMLTemplateElement = document.createElement('template');
  tempContainer.innerHTML = innerHtml;
  const template: T = tempContainer.content.firstChild as T;
  return template;
}

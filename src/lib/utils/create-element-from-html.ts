export default function createElementFromHtml(innerHtml: string): HTMLElement {
  const tempContainer: HTMLTemplateElement = document.createElement('template');
  tempContainer.innerHTML = innerHtml;
  const template: HTMLElement = tempContainer.content.firstChild as HTMLElement;
  return template;
}

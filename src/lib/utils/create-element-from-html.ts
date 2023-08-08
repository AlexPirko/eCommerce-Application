export default function createElementFromHtml(innerHtml: string): HTMLDivElement {
  const tempContainer: HTMLTemplateElement = document.createElement('template');
  tempContainer.innerHTML = innerHtml;
  const template: HTMLDivElement = tempContainer.content.firstChild as HTMLDivElement;
  return template;
}

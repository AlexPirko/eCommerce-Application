export function getAttributeFilterData(formData: FormData, attributeName: string): string | undefined {
  let attributeFilterString: string = `variants.attributes.${attributeName}:`;
  let counter: number = 0;
  for (const key of formData.keys()) {
    if (key.split('-')[0] === `${attributeName}`) {
      attributeFilterString += `"${key.split('-')[1]}",`;
      counter++;
    }
  }
  attributeFilterString = attributeFilterString.slice(0, -1);
  return counter ? attributeFilterString : undefined;
}

export function getFacetData(formData: FormData): string[] {
  const attributeFacetArray: string[] = [];
  const attrebuteNameArray: string[] = ['brand', 'type', 'kind'];
  let counter: number = 0;
  for (const key of formData.keys()) {
    attrebuteNameArray.forEach((attributeName) => {
      if (key.split('-')[0] === `${attributeName}`) {
        attributeFacetArray.push(
          `variants.attributes.${attributeName}: "${key.split('-')[1]}" as ${key.split('-')[1]}`
        );
        counter++;
      }
    });
  }
  return counter ? attributeFacetArray : [];
}

import { Product, ProductData } from '@commercetools/platform-sdk';
import { CardParams } from '@lib/types/params-interface';

export function getProductResponseAsCardData(product: Product): CardParams {
  const productData: ProductData = product.masterData.current;

  const imgUrls: string[] | undefined = productData.masterVariant.images?.map((image) => image.url);

  const cardParams: CardParams = {
    imgUrls: imgUrls as string[],
    name: productData.name['en-US'],
    description: productData.description?.['en-US'] as string,
    type: productData.masterVariant.attributes?.[0].value as string,
    brand: productData.masterVariant.attributes?.[1].value as string,
    price: String(productData.masterVariant.prices?.[0].value.centAmount),
  };
  return cardParams;
}

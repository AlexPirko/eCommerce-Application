import { Product, ProductData, ProductProjection } from '@commercetools/platform-sdk';
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
    key: product.key as string,
  };

  return cardParams;
}

export function getProductProjectionResponseAsCardData(product: ProductProjection): CardParams {
  const imgUrls: string[] | undefined = product.masterVariant.images?.map((image) => image.url);

  const cardParams: CardParams = {
    imgUrls: imgUrls as string[],
    name: product.name['en-US'],
    description: product.description?.['en-US'] as string,
    type: product.masterVariant.attributes?.[0].value as string,
    brand: product.masterVariant.attributes?.[1].value as string,
    price: String(product.masterVariant.prices?.[0].value.centAmount),
    key: product.key as string,
  };

  return cardParams;
}

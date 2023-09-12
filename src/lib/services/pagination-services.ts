import ProductCard from '@components/product-list/product-card/product-card';
import { FIRST_PAGE_NUMBER, PRODUCTS_PER_PAGE, SECOND_PAGE_NUMBER } from '@lib/constants/product-list-constants';
import { CardParams } from '@lib/types/params-interface';

export async function preventMultipleClickService(target: HTMLButtonElement): Promise<void> {
  target.setAttribute('data-locked', 'false');
}

export async function updateViewService(pageProducts: CardParams[]): Promise<void> {
  const productList: HTMLDivElement | null = document.querySelector('.product-list ');

  const currentProductList: NodeListOf<HTMLDivElement> = document.querySelectorAll('.card');
  currentProductList.forEach((card) => card.remove());

  pageProducts.forEach((cardData) => {
    const productCardComponent: ProductCard = new ProductCard(cardData, false);
    productList?.append(productCardComponent.element);
  });
}

export function nextButtonHandlerService(
  element: HTMLDivElement,
  nextButton: HTMLButtonElement,
  pageNumberElement: HTMLButtonElement,
  allProductsCount: number
): void {
  const prevButton: HTMLButtonElement | null = element.querySelector('.prev__button');

  const pageCount: number = Math.ceil(allProductsCount / PRODUCTS_PER_PAGE);
  const currentPageNumber: number = +pageNumberElement.innerHTML;

  if (currentPageNumber === pageCount - 1) {
    pageNumberElement.innerHTML = pageCount.toString();
    nextButton.setAttribute('disabled', 'true');
  } else if (currentPageNumber < pageCount - 1) {
    pageNumberElement.innerHTML = (currentPageNumber + 1).toString();
  }
  if (pageNumberElement.innerHTML === SECOND_PAGE_NUMBER.toString()) {
    prevButton?.removeAttribute('disabled');
  }
}

export function prevButtonHandlerService(
  element: HTMLDivElement,
  prevButton: HTMLButtonElement,
  pageNumberElement: HTMLButtonElement,
  allProductsCount: number
): void {
  const nextButton: HTMLButtonElement | null = element.querySelector('.next__button');

  const pageCount: number = Math.ceil(allProductsCount / PRODUCTS_PER_PAGE);
  const currentPageNumber: number = +pageNumberElement.innerHTML;

  if (currentPageNumber === SECOND_PAGE_NUMBER) {
    pageNumberElement.innerHTML = FIRST_PAGE_NUMBER.toString();
    prevButton.setAttribute('disabled', 'true');
    nextButton?.removeAttribute('disabled');
  } else if (currentPageNumber > SECOND_PAGE_NUMBER) {
    pageNumberElement.innerHTML = (currentPageNumber - 1).toString();
  }
  if (pageNumberElement.innerHTML === (pageCount - 1).toString()) {
    nextButton?.removeAttribute('disabled');
  }
}

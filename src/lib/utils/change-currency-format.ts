export function changeCurrencyFormat(num: number): string {
  const currency: string = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  return currency;
}

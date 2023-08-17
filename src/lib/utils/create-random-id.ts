export function generateAnonymousId(): string {
  const COUNT_OF_ID_NUMBERS = 5;
  const NUMBER_MAX_VALUE = 10;
  const arrayOfRamdomNumbers: string[] = [];
  for (let i: number = 0; i < COUNT_OF_ID_NUMBERS; i++) {
    const randomNumber: number = Math.floor((1000 * Math.random()) % NUMBER_MAX_VALUE);
    arrayOfRamdomNumbers.push(randomNumber.toString());
  }
  const anonymousId: string = arrayOfRamdomNumbers.join('');
  return anonymousId;
}

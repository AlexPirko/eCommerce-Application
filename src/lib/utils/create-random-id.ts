export function generateAnonymousId() {
  const arrayOfRamdomNumbers: string[] = [];
  for (let i: number = 0; i < 5; i++) {
    const randomNumber = Math.round((1000 * Math.random()) % 10);
    arrayOfRamdomNumbers.push(randomNumber.toString());
  }
  const anonymousId: string = arrayOfRamdomNumbers.join('');
  return anonymousId;
}

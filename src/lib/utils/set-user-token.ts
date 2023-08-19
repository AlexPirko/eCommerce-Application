import { TokenInfo } from '@commercetools/sdk-client-v2';

export async function setUserToken(getTokenPromise: Promise<TokenInfo>): Promise<void> {
  const getTokenResponce: TokenInfo = await getTokenPromise;
  localStorage.setItem('token', getTokenResponce['access_token']);
  localStorage.setItem('refreshToken', getTokenResponce['refresh_token']);
}

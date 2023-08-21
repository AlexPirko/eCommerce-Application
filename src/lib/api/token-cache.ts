import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export default class ClientTokenCache implements TokenCache {
  private cache: TokenStore;

  constructor() {
    this.cache = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }

  public get(): TokenStore {
    return this.cache;
  }

  public set(cache: TokenStore): void {
    this.cache = cache;
  }
}

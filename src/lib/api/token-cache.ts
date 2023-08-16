import { TokenStore } from '@commercetools/sdk-client-v2';

export default class ClientTokenCache {
  //private tokenCacheOptions: TokenCacheOptions | undefined;
  private cache: TokenStore;

  constructor() {
    //this.tokenCacheOptions = undefined;
    this.cache = {
      token: '',
      expirationTime: 0,
    };
  }

  public get(/*tokenCacheOptions: TokenCacheOptions | undefined*/): TokenStore {
    return this.cache;
  }

  public set(cache: TokenStore /* tokenCacheOptions: TokenCacheOptions | undefined*/): void {
    this.cache = cache;
  }
}

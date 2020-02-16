import { GraphQLClient } from 'graphql-request';

import env from 'config/env';
import AppStore from './appStore';
import ProductsStore from './productsStore';

export class RootStore {
  public api: GraphQLClient;
  public appStore = new AppStore();
  public productsStore: ProductsStore;

  constructor() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    this.api = new GraphQLClient(env.api, {
      mode: 'cors',
      headers: headers as any,
    });

    this.productsStore = new ProductsStore(this.api);
  }
}

export default new RootStore();

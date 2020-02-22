import { action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import env from 'config/env';
import AppStore from './appStore';
import ProductsStore from './productsStore';
import CategoriesStore from './categoriesStore';

export class RootStore {
  public api: GraphQLClient;
  public appStore = new AppStore(this);
  public productsStore = new ProductsStore(this);
  public categoriesStore = new CategoriesStore(this);

  constructor() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    this.api = new GraphQLClient(env.api, {
      mode: 'cors',
      headers: headers as any,
    });
  }

  @action init = () => {
    this.categoriesStore.fetchCategories();
  };
}

export default new RootStore();

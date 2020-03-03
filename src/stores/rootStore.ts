import { action } from 'mobx';
import { GraphQLClient } from 'graphql-request';
import { get, set } from 'local-storage';

if (typeof localStorage === 'undefined' || localStorage === null) {
  (global as any).localStorage = { getItem: get, setItem: set };
}

import env from 'config/env';
import AppStore from './appStore';
import BasketStore from './basketStore';
import ProductsStore from './productsStore';
import FavouriteStore from './favouritesStore';
import CategoriesStore from './categoriesStore';
import SlidesStore from './slidesStore';

export class RootStore {
  public api: GraphQLClient;
  public appStore = new AppStore(this);
  public basketStore = new BasketStore();
  public favouriteStore = new FavouriteStore();
  public productsStore = new ProductsStore(this);
  public categoriesStore = new CategoriesStore(this);
  public slidesStore = new SlidesStore(this);

  constructor() {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');

    this.api = new GraphQLClient(env.api, {
      mode: 'cors',
      headers: headers as any,
    });
  }

  @action public init = () => {
    this.categoriesStore.fetchCategories();
  };
}

export default new RootStore();

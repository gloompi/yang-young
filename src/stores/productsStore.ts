import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { RootStore } from 'stores/rootStore';
import { AppStore } from 'stores/appStore';
import { IProduct } from 'types/common';

interface IArgument {
  [key: string]: string;
}

interface IFetchProps extends IArgument{
  category: string;
}

const LIMIT = 9;

const getQueryProps = (args: IArgument) => {
  let queryString = '';

  Object.entries(args).forEach(([key, value]) => {
    queryString = `${queryString}, ${key}: ${value}`;
  });

  return queryString;
};

class ProductsStore {
  @observable private _products: IProduct[] = [];
  @observable private _loading: boolean = true;
  @observable public error: Error | null = null;
  private _step: number = 9;

  constructor(private rootStore: RootStore) {}

  get api(): GraphQLClient {
    return this.rootStore.api;
  }

  get appStore(): AppStore {
    return this.rootStore.appStore;
  }

  get products(): IProduct[] {
    return this._products;
  }

  get loading(): boolean {
    return this._loading;
  }

  @action public fetchProducts = async ({
    category = '1',
    ...args
  }: IFetchProps) => {
    const queryProps = getQueryProps(args);

    const query = `{
      products(category: ${category}${queryProps}) {
        slug
        title: ${this.appStore.lang === 'en' ? 'title' : 'titleCN'}
        subtitle: ${this.appStore.lang === 'en' ? 'subtitle' : 'subtitleCN'}
        price
        coverImg
        animatedImg
        categories {
          name
        }
        specialOffers {
          name: ${this.appStore.lang === 'en' ? 'name' : 'nameCN'}
        }
      }
    }`;

    this._products = [];
    this._loading = true;

    try {
      const result: { products: IProduct[] } = await this.api.request(query);
      this._products = result.products;
    } catch (error) {
      this.error = error;
    } finally {
      this._loading = false;
    }
  };

  @action public extendProducts = async ({ category = '1' }: IFetchProps) => {
    const query = `{
      products(category: ${category}, limit: ${LIMIT}, step: ${this._step}) {
        slug
        title: ${this.appStore.lang === 'en' ? 'title' : 'titleCN'}
        subtitle: ${this.appStore.lang === 'en' ? 'subtitle' : 'subtitleCN'}
        price
        coverImg
        animatedImg
        categories {
          name
        }
        specialOffers {
          name: ${this.appStore.lang === 'en' ? 'name' : 'nameCN'}
        }
      }
    }`;

    this._loading = true;

    try {
      const result: { products: IProduct[] } = await this.api.request(query);
      this._products = [...this.products, ...result.products];
    } catch (error) {
      this.error = error;
    } finally {
      this._loading = false;
      this._step = this._step + LIMIT;
    }
  };
}

export default ProductsStore;

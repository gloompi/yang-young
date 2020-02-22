import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { RootStore } from 'stores/rootStore';
import { AppStore } from 'stores/appStore';
import { IProduct, IDevice, IColor } from 'types/common';

interface IArgument {
  [key: string]: string;
}

interface IFetchProps extends IArgument{
  category: string;
}

const getQueryProps = (args: IArgument) => {
  let queryString = '';

  Object.entries(args).forEach(([key, value]) => {
    queryString = `${queryString}, ${key}: ${value}`;
  });

  return queryString;
};

class ProductsStore {
  @observable private _products: IProduct[] = [];
  @observable private _devices: IDevice[] = [];
  @observable private _colors: IColor[] = [];
  @observable private _loading: boolean = true;
  @observable public error: Error | null = null;

  constructor(private rootStore: RootStore) {}

  get api(): GraphQLClient {
    return this.rootStore.api;
  }

  get appStore(): AppStore {
    return this.rootStore.appStore;
  }

  get colors(): IColor[] {
    return this._colors;
  }

  get devices(): IDevice[] {
    return this._devices;
  }

  get products(): IProduct[] {
    return this._products;
  }

  get loading(): boolean {
    return this._loading;
  }

  @action public initialFetch = (categoryId: string) => {
    this.fetchColors();
    this.fetchDevices(categoryId);
    this.fetchProducts({ category: categoryId });
  };

  @action public fetchColors = async () => {
    const query = `{
      colors {
        id
        name: ${this.appStore.lang === 'en' ? 'name' : 'nameCN'}
      }
    }`;

    this._colors = [];

    try {
      const result: { colors: IColor[] } = await this.api.request(query);
      this._colors = result.colors;
    } catch (error) {
      this.error = error;
    }
  };

  @action public fetchDevices = async (category: string) => {
    const query = `{
      devices(category: "${category}") {
        id
        name
      }
    }`;

    this._devices = [];

    try {
      const result: { devices: IDevice[] } = await this.api.request(query);
      this._devices = result.devices;
    } catch (error) {
      this.error = error;
    }
  };

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
}

export default ProductsStore;

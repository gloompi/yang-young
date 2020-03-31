import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { RootStore } from 'stores/rootStore';
import { AppStore } from 'stores/appStore';
import { IProductPaginated, IProduct, IFamily, IColor } from 'types/common';

interface IArgument {
  [key: string]: string | number;
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
  @observable private _loading: boolean = true;
  @observable public error: Error | null = null;
  @observable public page: number = 1;
  @observable public pages: number = 1;
  @observable public hasNext: boolean = false;
  @observable public hasPrev: boolean = false;

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

  @action public fetchProducts = async (args: IArgument) => {
    const queryProps = getQueryProps(args);

    const query = `{
      products(${queryProps}) {
        nodes {
          slug
          title: ${this.appStore.lang === 'en' ? 'title' : 'titleCN'}
          subtitle: ${this.appStore.lang === 'en' ? 'subtitle' : 'subtitleCN'}
          price
          weight
          coverImg
          animatedImg
          deliveryOption {
            name
            pricePerKg
          }
          categories {
            name
          }
          specialOffers {
            name: ${this.appStore.lang === 'en' ? 'name' : 'nameCN'}
          }
        }
        page
        pages
        hasNext
        hasPrev
      }
    }`;

    this._products = [];
    this._loading = true;

    try {
      const result: { products: IProductPaginated } = await this.api.request(
        query
      );
      this._products = result.products.nodes;
      this.page = result.products.page;
      this.pages = result.products.pages;
      this.hasNext = result.products.hasNext;
      this.hasPrev = result.products.hasPrev;
    } catch (error) {
      this.error = error;
    } finally {
      this._loading = false;
    }
  };

  @action public fetchProductByFamily = async (
    family: IFamily,
    color: IColor
  ) => {
    const query = `{
      product(family: ${family}, color: ${color}) {
        slug
      }
    }`;

    const product: IProduct = await this.api.request(query);

    return product;
  };
}

export default ProductsStore;

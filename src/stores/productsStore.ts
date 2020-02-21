import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { IProduct } from 'types/common';

interface IResult {
  products: IProduct[];
}

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
  @observable private _loading: boolean = true;
  @observable public error: Error | null = null;

  constructor(private api: GraphQLClient) {}

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
        title
        subtitle
        price
        coverImg
        animatedImg
        categories {
          name
        }
        specialOffers {
          name
        }
      }
    }`;

    this._products = [];
    this._loading = true;

    try {
      const result: IResult = await this.api.request(query);
      this._products = result.products;
    } catch (error) {
      this.error = error;
    } finally {
      this._loading = false;
    }
  };
}

export default ProductsStore;

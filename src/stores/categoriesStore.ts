import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { ICategory } from 'types/common';
import { AppStore } from 'stores/appStore';
import { RootStore } from 'stores/rootStore';

class CategoriesStore {
  @observable private _loading: boolean = true;
  @observable private _categories: ICategory[] = [];
  @observable public error: Error | null = null;

  constructor(private rootStore: RootStore) {}

  get api(): GraphQLClient {
    return this.rootStore.api;
  }

  get appStore(): AppStore {
    return this.rootStore.appStore;
  }

  get loading(): boolean {
    return this._loading;
  }

  get categories(): ICategory[] {
    return this._categories;
  }

  @action public fetchCategories = async () => {
    const query = `{
      categories {
        id
        name
        title: ${this.appStore.lang === 'en' ? 'title' : 'titleCN'}
        coverImg
        products {
          nodes {
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
        }
      }
    }`;

    this._categories = [];
    this._loading = true;

    try {
      const result: { categories: ICategory[] } = await this.api.request(query);
      this._categories = result.categories;
    } catch (error) {
      this.error = error;
    } finally {
      this._loading = false;
    }
  };
}

export default CategoriesStore;

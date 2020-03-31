import { observable, action } from 'mobx';

import { IProduct } from 'types/common';
import { RootStore } from 'stores/rootStore';

class SearchStore {
  @observable public searchString = '';
  @observable public loading = false;
  @observable public products: IProduct[] = [];

  constructor(private rootStore: RootStore) {}

  @action public changeSearchString = (value: string): void => {
    this.searchString = value;
  };

  @action public handleSearch = async () => {
    const appStore = this.rootStore.appStore;

    const query = `{
      products(search: "${this.searchString}") {
        nodes {
          slug
          title: ${appStore.lang === 'en' ? 'title' : 'titleCN'}
          subtitle: ${appStore.lang === 'en' ? 'subtitle' : 'subtitleCN'}
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
            name: ${appStore.lang === 'en' ? 'name' : 'nameCN'}
          }
        }
        page
        pages
        hasNext
        hasPrev
      }
    }`;

    this.products = [];
    this.loading = true;

    try {
      const res = await this.rootStore.api.request(query);
      this.products = res.products.nodes;
    } catch (error) {
      // nothing
    } finally {
      this.loading = false;
    }
  }
}

export default SearchStore;

import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { RootStore } from 'stores/rootStore';
import { ISlide } from 'types/common';

export interface IExtendedSlide extends ISlide {
  next: IExtendedSlide | null;
  prev: IExtendedSlide | null;
}

const extendSlides = (slides: ISlide[]): IExtendedSlide[] => {
  const initialAcc: {
    prev: IExtendedSlide | null;
    result: IExtendedSlide[];
  } = {
    prev: null,
    result: [],
  };

  const { result } = slides.reduce((acc, slide) => {
    const item = {
      ...slide,
      prev: acc.prev,
      next: null,
    };

    if (acc.prev !== null) {
      acc.prev.next = item;
    }

    return {
      prev: item,
      result: [...acc.result, item],
    };
  }, initialAcc);

  return result;
};

class ProductsStore {
  private _slides: IExtendedSlide[] = [];
  @observable private _loading: boolean = true;
  @observable private _error: Error | null = null;

  constructor(private rootStore: RootStore) {}

  get api(): GraphQLClient {
    return this.rootStore.api;
  }

  get slides(): IExtendedSlide[] {
    return this._slides;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): Error | null {
    return this._error;
  }

  @action public fetchSlides = async () => {
    const query = `{
      slides {
        id
        title
        subtitle
        description
        coverImg
      }
    }`;

    this._slides = [];
    this._error = null;

    try {
      const { slides }: { slides: IExtendedSlide[] } = await this.api.request(
        query
      );
      this._slides = extendSlides(slides);
    } catch (error) {
      this._error = error;
    } finally {
      this._loading = false;
    }
  };
}

export default ProductsStore;

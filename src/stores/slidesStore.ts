import { observable, action } from 'mobx';
import { GraphQLClient } from 'graphql-request';

import { RootStore } from 'stores/rootStore';
import { ISlide, IStaticText } from 'types/common';

export interface IExtendedSlide extends ISlide {
  next: IExtendedSlide | null;
  prev: IExtendedSlide | null;
}

const defaultStatic = {
  id: '',
  title: '',
  titleCN: '',
  description: '',
  descriptionCN: '',
};

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
  private _staticText: IStaticText = defaultStatic;
  @observable private _loading: boolean = true;
  @observable private _error: Error | null = null;

  constructor(private rootStore: RootStore) {}

  get api(): GraphQLClient {
    return this.rootStore.api;
  }

  get slides(): IExtendedSlide[] {
    return this._slides;
  }

  get staticText(): IStaticText {
    return this._staticText;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): Error | null {
    return this._error;
  }

  @action public fetchStaticText = async () => {
    const query = `{
      staticText(id:"1") {
        id
        title
        titleCN
        description
        descriptionCN
      }
    }`;

    this._staticText = defaultStatic;

    try {
      const {
        staticText,
      }: { staticText: IStaticText } = await this.api.request(query);
      this._staticText = staticText;
    } catch {
      this._staticText = defaultStatic;
    }
  };

  @action public fetchSlides = async () => {
    const query = `{
      slides {
        id
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

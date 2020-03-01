import { action, observable } from 'mobx';

import { IProduct } from 'types/common';

const FAVOURITE_PRODUCTS = 'FAVOURITE_PRODUCTS';

class FavouritesStore {
  private _items = observable.map<string, IProduct>();

  constructor() {
    const items = observable.map<string, IProduct>(
      JSON.parse(localStorage.getItem(FAVOURITE_PRODUCTS)!)
    );

    if (items !== null && items.size) {
      this._items = items;
    }
  }

  public get length(): number {
    return this._items.size;
  }

  public get items(): Map<string, IProduct> {
    return this._items;
  }

  @action public removeFromFavourite = (id: string): void => {
    this._items.delete(id);
    localStorage.setItem(
      FAVOURITE_PRODUCTS,
      JSON.stringify(Array.from(this._items))
    );
  };

  @action public addToFavourite = (id: string, product: IProduct): void => {
    this._items.set(id, product);
    localStorage.setItem(
      FAVOURITE_PRODUCTS,
      JSON.stringify(Array.from(this._items))
    );
  };
}

export default FavouritesStore;

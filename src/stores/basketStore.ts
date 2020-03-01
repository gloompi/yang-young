import { action, observable } from 'mobx';

import { IProduct } from 'types/common';

const BASKET_PRODUCTS = 'BASKET_PRODUCTS';

class BasketStore {
  private _items = observable.map<string, IProduct>();

  constructor() {
    const items = observable.map<string, IProduct>(
      JSON.parse(localStorage.getItem(BASKET_PRODUCTS)!)
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

  @action public removeFromBasket = (id: string): void => {
    this._items.delete(id);
    localStorage.setItem(
      BASKET_PRODUCTS,
      JSON.stringify(Array.from(this._items))
    );
  };

  @action public addToBusket = (id: string, product: IProduct): void => {
    this._items.set(id, product);
    localStorage.setItem(
      BASKET_PRODUCTS,
      JSON.stringify(Array.from(this._items))
    );
  };
}

export default BasketStore;

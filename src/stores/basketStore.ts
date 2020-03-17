import { action, observable, reaction } from 'mobx';

import { IBasketProduct, IProduct } from 'types/common';

const BASKET_PRODUCTS = 'BASKET_PRODUCTS';

class BasketStore {
  private _items = observable.map<string, IBasketProduct>();

  constructor() {
    const items = observable.map<string, IBasketProduct>(
      JSON.parse(localStorage.getItem(BASKET_PRODUCTS)!)
    );

    if (items !== null && items.size) {
      this._items = items;
    }

    reaction(
      () => this._items.size,
      () => {
        localStorage.setItem(
          BASKET_PRODUCTS,
          JSON.stringify(Array.from(this._items))
        );
      }
    );
  }

  public get length(): number {
    return this._items.size;
  }

  public get items(): Map<string, IBasketProduct> {
    return this._items;
  }

  @action public removeFromBasket = (id: string): void => {
    this._items.delete(id);
  };

  @action public addToBusket = (id: string, product: IProduct): void => {
    if (this._items.has(id)) {
      return;
    }

    const basketProduct = { ...product, quantity: 1 };

    this._items.set(id, basketProduct);
  };

  @action public increaseQuantity = (id: string) => {
    const current = this._items.get(id);

    if (current) {
      this._items.set(id, { ...current, quantity: current.quantity + 1 });
    }
  };

  @action public decreaseQuantity = (id: string) => {
    const current = this._items.get(id);

    if (current?.quantity === 1) {
      this._items.delete(id);
    }

    if (current && current.quantity > 1) {
      this._items.set(id, { ...current, quantity: current.quantity - 1 });
    }
  };
}

export default BasketStore;

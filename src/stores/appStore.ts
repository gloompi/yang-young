import { observable, action } from 'mobx';

class AppStore {
  @observable private _headerHeight = 0;

  get headerHeight(): number {
    return this._headerHeight;
  }

  @action public setHeaderHeight = (value: number) => {
    this._headerHeight = value;
  };
}

export default AppStore;

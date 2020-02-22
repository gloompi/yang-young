import { observable, action, reaction } from 'mobx';
import i18next from 'i18next';

import { RootStore } from 'stores/rootStore';

export class AppStore {
  @observable private _headerHeight = 0;
  @observable private _lang: string = 'en';

  constructor(private rootStore: RootStore) {
    reaction(
      () => this._lang,
      lang => {
        i18next.changeLanguage(lang);
        this.rootStore.init();
      }
    );
  }

  public get lang(): string {
    return this._lang;
  }

  public get headerHeight(): number {
    return this._headerHeight;
  }

  @action public setHeaderHeight = (value: number) => {
    this._headerHeight = value;
  };

  @action public setLang(lang: string): void {
    this._lang = lang;
  }
}

export default AppStore;

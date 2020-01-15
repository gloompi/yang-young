import AppStore from './appStore';

export class RootStore {
  public appStore = new AppStore();
}

export default new RootStore();

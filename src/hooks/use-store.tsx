import React, { FC, useContext, createContext } from 'react';
import rootStore, { RootStore } from 'stores/rootStore';

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider: FC = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);

export default (): RootStore => {
  const stores = useContext(StoreContext);

  if (!stores) {
    throw new Error(
      'Please, make sure that `StoreProvider` specified higher in the tree'
    );
  }

  return stores;
};

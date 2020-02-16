import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import Loader from 'components/common/loader';
import ProductsList from 'components/common/productsList';

const List: FC = observer(() => {
  const { productsStore } = useStore();

  return (
    <>
      {productsStore.loading ? (
        <Loader />
      ) : (
        <ProductsList path="cases" products={productsStore.products} />
      )}
    </>
  );
});

export default List;

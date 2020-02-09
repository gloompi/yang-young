import React, { FC } from 'react';

import useAllAccessories from 'hooks/use-all-accessories';
import ItemList from 'components/common/itemsList';

const List: FC = () => {
  const accessories = useAllAccessories();

  return (
    <>
      <ItemList path="accessories" products={accessories} />
    </>
  );
};

export default List;

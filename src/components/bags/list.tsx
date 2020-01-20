import React, { FC } from 'react';

import useAllBags from 'hooks/use-all-bags';
import ItemList from 'components/common/itemsList';

const List: FC = () => {
  const bags = useAllBags();

  return (
    <>
      <ItemList path="case" items={bags} />
    </>
  );
};

export default List;

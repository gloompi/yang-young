import React, { FC } from 'react';

import useAllCases from 'hooks/use-all-cases';
import ItemList from 'components/common/itemsList';

const List: FC = () => {
  const cases = useAllCases();

  return (
    <>
      <ItemList path="case" items={cases} />
    </>
  );
};

export default List;

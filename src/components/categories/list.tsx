import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/core';

import useStore from 'hooks/use-store';
import Loader from 'components/common/loader';
import ProductsList from 'components/product/productsList';

interface IProps {
  categoryId: string;
}

const List: FC<IProps> = observer(() => {
  const { productsStore } = useStore();

  return (
    <div css={wrapperCss}>
      {productsStore.loading ? (
        <Loader />
      ) : (
        <>
          <ProductsList path="cases" products={productsStore.products} />
        </>
      )}
    </div>
  );
});

const wrapperCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
`;

export default List;

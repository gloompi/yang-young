import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/core';

import useStore from 'hooks/use-store';
import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import ProductsList from 'components/product/productsList';

const SearchPage: FC = observer(() => {
  const { searchStore } = useStore();

  return (
    <Layout>
      <SEO title="Search" />
      <div css={wrapperCss}>
        <ProductsList products={searchStore.products} />
      </div>
    </Layout>
  );
});

const wrapperCss = css`
  padding: 130px 50px 25px;
`;

export default SearchPage;

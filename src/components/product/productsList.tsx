import React, { FC } from 'react';
import { css } from '@emotion/core';
import useTheme, { ITheme } from 'hooks/use-theme';

import { IProduct } from 'types/common';
import ProductPreview from 'components/product/productPreview';

interface IProps {
  path: string;
  products: IProduct[];
}

const ProductsList: FC<IProps> = ({ path, products }) => {
  const theme = useTheme();

  return (
    <div css={wrapperCss(theme)}>
      <ul css={listCss}>
        {products.map(product => {
          const {
            categories: [category],
            slug,
          } = product;

          return (
            <ProductPreview
              key={slug}
              link={`/${(category && category.name) || path}/${slug}`}
              itemsCount={3}
              product={product}
            />
          );
        })}
      </ul>
    </div>
  );
};

const wrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  background-color: ${theme.colors.white};
`;

const listCss = css`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;

  li {
    margin-bottom: 25px;
  }
`;

export default ProductsList;

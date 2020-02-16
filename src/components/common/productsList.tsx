import React, { FC } from 'react';
import { css } from '@emotion/core';
import useTheme, { ITheme } from 'hooks/use-theme';

import { IProduct } from 'types/common';
import ProductPreview from 'components/common/productPreview';

interface IProps {
  path: string;
  products: IProduct[];
}

const ProductsList: FC<IProps> = ({ path, products }) => {
  const theme = useTheme();

  return (
    <div css={wrapperCss(theme)}>
      <ul css={listCss}>
        {products.map(
          ({
            title: productTitle,
            categories: [category],
            slug,
            coverImg,
            subtitle,
            price,
            specialOffers,
          }) => (
            <ProductPreview
              key={slug}
              link={`/${(category && category.name) || path}/${slug}`}
              imgSrc={coverImg}
              title={productTitle}
              subtitle={subtitle}
              price={price}
              specialOffers={specialOffers}
              itemsCount={3}
            />
          )
        )}
      </ul>
    </div>
  );
};

const wrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  background-color: ${theme.colors.white};
`;

const listCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;

  li {
    margin-bottom: 25px;
  }
`;

export default ProductsList;

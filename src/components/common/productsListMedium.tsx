import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import env from 'config/env';
import { IProduct } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import ProductPreview from 'components/common/productPreview';

interface IProps {
  path: string;
  title: string;
  image: string;
  products: IProduct[];
}

const ItemsListMedium: FC<IProps> = ({ title, path, image, products }) => {
  const theme = useTheme();

  return (
    <div css={mediumListWrapperCss(theme)}>
      <Link to={`/${path}`} css={linkToAllItemsCss}>
        <img src={`${env.mediaUrl}/${image}`} css={categoryImageCss} />
        <div css={linkTextCss}>
          <h3>{title}</h3>
          <button css={buttonCss}>Shop now</button>
        </div>
      </Link>
      <ul css={listCss}>
        {products.map(product => {
          const {
            categories: [category],
            slug,
          } = product;

          return (
            <ProductPreview
              key={slug}
              link={`/${category.name}/${slug}`}
              itemsCount={2}
              {...product}
            />
          );
        })}
      </ul>
    </div>
  );
};

const mediumListWrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 84px;
  padding: 0 ${theme.containerRange()};

  &:last-child {
    margin-bottom: 0;
  }
`;

const listCss = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 50%;
`;

const linkToAllItemsCss = css`
  position: relative;
  width: 45%;
`;

const categoryImageCss = css`
  width: 100%;
  height: 100%;
`;

const linkTextCss = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: Oswald;
  font-size: 24px;
  font-weight: 400;
  text-transform: uppercase;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  letter-spacing: 0.5px;

  h3 {
    color: #fff;
  }
`;

const buttonCss = css`
  margin-top: 32px;
  cursor: pointer;
  box-shadow: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  color: rgb(255, 255, 255);
  padding: 0px 32px;
  font: 400 16px / 40px Oswald;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-image: initial;
`;

export default ItemsListMedium;

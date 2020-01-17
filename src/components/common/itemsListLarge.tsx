import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import { ICategoryImage, IItem } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import ItemPreview from 'components/common/itemPreview';

interface IProps {
  path: string;
  title: string;
  image: ICategoryImage;
  items: IItem[];
}

const ItemsListMedium: FC<IProps> = ({ title, path, image, items }) => {
  const theme = useTheme();

  return (
    <div css={mediumListWrapperCss(theme)}>
      <ul css={listCss}>
        {items.map(
          ({
            title: itemTitle,
            id,
            imgSrc,
            subtitle,
            price,
            specialOffers,
          }) => (
            <ItemPreview
              key={id}
              link={`/${path}/${id}`}
              imgSrc={imgSrc}
              title={itemTitle}
              subtitle={subtitle}
              price={price}
              specialOffers={specialOffers}
              itemsCount={items.length}
            />
          )
        )}
      </ul>
      <Link to={`/${path}`} css={linkToAllItemsCss}>
        <Image fluid={image.fluid} css={categoryImageCss} />
        <div css={linkTextCss}>
          <h3>{title}</h3>
          <button css={buttonCss}>Shop now</button>
        </div>
      </Link>
    </div>
  );
};

const mediumListWrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;
  padding: 0 ${theme.containerRange()};
`;

const listCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 24.5%;
`;

const linkToAllItemsCss = css`
  position: relative;
  width: 71%;
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

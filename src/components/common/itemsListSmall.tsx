import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { IoIosArrowRoundForward } from 'react-icons/io';
import Image from 'gatsby-image';
import useTheme, { ITheme } from 'hooks/use-theme';

import { IItem, ICategoryImage } from 'types/common';
import ItemPreview from 'components/common/itemPreview';

interface IProps {
  path: string;
  title: string;
  items: IItem[];
  image: ICategoryImage;
}

const ItemsList: FC<IProps> = ({ title, path, items, image }) => {
  const theme = useTheme();

  return (
    <div css={wrapperCss(theme)}>
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
          <IoIosArrowRoundForward />
        </div>
      </Link>
    </div>
  );
};

const wrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  padding: 84px ${theme.containerRange()} 42px;
  background-color: ${theme.colors.white};
`;

const listCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 73.5%;
`;

const linkToAllItemsCss = css`
  position: relative;
  width: 24.5%;
  height: 620px;
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

  svg {
    font-size: 52px;
  }
`;

export default ItemsList;

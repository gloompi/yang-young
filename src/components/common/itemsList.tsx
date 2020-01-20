import React, { FC } from 'react';
import { css } from '@emotion/core';
import useTheme, { ITheme } from 'hooks/use-theme';

import { IItem } from 'types/common';
import ItemPreview from 'components/common/itemPreview';

interface IProps {
  path: string;
  items: IItem[];
}

const ItemsList: FC<IProps> = ({ path, items }) => {
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
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;

  li {
    margin-bottom: 25px;
  }
`;

export default ItemsList;

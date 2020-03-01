import React, { FC, MouseEvent } from 'react';
import { css } from '@emotion/core';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';

import env from 'config/env';
import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import { IProduct } from 'types/common';

interface IProps {
  product: IProduct;
}

const SideBarItem: FC<IProps> = ({ product }) => {
  const theme = useTheme();
  const { basketStore, favouriteStore } = useStore();
  const activeBasket = basketStore.items.has(product.slug);
  const activeFavourite = favouriteStore.items.has(product.slug);

  const handleToggleFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (favouriteStore.items.has(product.slug)) {
      favouriteStore.removeFromFavourite(product.slug);
    } else {
      favouriteStore.addToFavourite(product.slug, product);
    }
  };

  const handleToggleBasket = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (basketStore.items.has(product.slug)) {
      basketStore.removeFromBasket(product.slug);
    } else {
      basketStore.addToBusket(product.slug, product);
    }
  };

  return (
    <li css={itemCss(theme)}>
      <img
        src={`${env.mediaUrl}/${product.coverImg}`}
        css={imageCss}
        alt={product.title}
      />

      <div css={middleCss}>
        <h3 css={titleCss(theme)}>{product.title}</h3>
        <span>{product.price}$</span>
      </div>

      <div css={bottomWrapCss}>
        <button
          css={iconCss(theme, activeFavourite)}
          style={{ marginBottom: 15 }}
          onClick={handleToggleFavourite}
        >
          <IoMdHeartEmpty />
        </button>
        <button css={iconCss(theme, activeBasket)} onClick={handleToggleBasket}>
          <FiShoppingBag />
        </button>
      </div>
    </li>
  );
};

const itemCss = (theme: ITheme) => css`
  display: flec;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${theme.colors.lightBlack};

  &:last-child {
    border-bottom: none;
  }
`;

const imageCss = css`
  width: 50px;
`;

const middleCss = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 25px;
`;

const titleCss = (theme: ITheme) => css`
  ${theme.fontFamily('MontSerrat')};
  font-size: 18px;
`;

const bottomWrapCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-right: 5px;
  margin-left: 25px;
`;

const iconCss = (theme: ITheme, active: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  width: 25px;
  height: 25px;
  color: ${active ? theme.colors.white : theme.colors.black};
  background-color: ${active ? theme.colors.primary : theme.colors.white};
  border-radius: 50%;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

export default SideBarItem;

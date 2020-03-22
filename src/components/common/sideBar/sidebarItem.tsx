import React, { FC, MouseEvent } from 'react';
import { css } from '@emotion/core';
import { FaShoppingBag } from 'react-icons/fa';
import { IoMdHeart, IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { observer } from 'mobx-react-lite';

import env from 'config/env';
import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import { IProduct, IBasketProduct } from 'types/common';

interface IProps {
  product: IProduct | IBasketProduct;
  big?: boolean;
}

const SideBarItem: FC<IProps> = observer(({ product, big = false }) => {
  const theme = useTheme();
  const { basketStore, favouriteStore } = useStore();
  const activeBasket = basketStore.items.has(product.slug);
  const activeFavourite = favouriteStore.items.has(product.slug);

  const handleToggleFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const favProduct = { ...product };

    if ('quantity' in favProduct) {
      delete favProduct.quantity;
    }

    if (favouriteStore.items.has(favProduct.slug)) {
      favouriteStore.removeFromFavourite(favProduct.slug);
    } else {
      favouriteStore.addToFavourite(favProduct.slug, favProduct);
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

  const handleDecrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    basketStore.decreaseQuantity(product.slug);
  };

  const handleIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    basketStore.increaseQuantity(product.slug);
  };

  return (
    <li css={itemCss(theme)}>
      <img
        src={`${env.mediaUrl}/${product.coverImg}`}
        css={imageCss}
        alt={product.title}
      />

      <div css={middleCss}>
        <h3 css={titleCss(theme, big)}>{product.title}</h3>
        <span>{product.price}$</span>
        {'quantity' in product && (
          <div css={quantityCss(big)}>
            <button onClick={handleDecrease}>
              <IoIosArrowBack />
            </button>
            <span style={{ padding: '0 10px' }}>{product.quantity}</span>
            <button onClick={handleIncrease}>
              <IoIosArrowForward />
            </button>
          </div>
        )}
      </div>

      <div css={bottomWrapCss}>
        <button
          css={iconCss(theme, activeFavourite, big)}
          style={{ marginBottom: 15 }}
          onClick={handleToggleFavourite}
        >
          <IoMdHeart />
        </button>
        <button
          css={iconCss(theme, activeBasket, big)}
          onClick={handleToggleBasket}
        >
          <FaShoppingBag />
        </button>
      </div>
    </li>
  );
});

const itemCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${theme.colors.lightBlack};

  &:last-child {
    border-bottom: none;
  }
`;

const imageCss = css`
  width: 20%;
`;

const middleCss = css`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 50%;
  padding: 0 25px;
  overflow: hidden;
`;

const quantityCss = (big: boolean) => css`
  font-size: ${big ? 25 : 16}px;
  ${big
    ? `
      margin-top: 15px;
    `
    : ''}
`;

const titleCss = (theme: ITheme, big: boolean) => css`
  ${theme.fontFamily('MontSerrat')};
  font-size: ${big ? 25 : 18}px;
`;

const bottomWrapCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-right: 5px;
  margin-left: 25px;
`;

const iconCss = (theme: ITheme, active: boolean, big: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${big ? 25 : 15}px;
  width: 25px;
  height: 25px;
  color: ${active ? theme.colors.primary : theme.colors.black};
  background-color: ${theme.colors.white};
  border-radius: 50%;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

export default SideBarItem;

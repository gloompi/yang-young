import React, { FC } from 'react';
import get from 'lodash/get';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { Link } from 'gatsby';

import { IProduct } from 'types/common';
import { TSideBar } from 'components/common/header';
import BasketStore from 'stores/basketStore';
import useTheme, { ITheme } from 'hooks/use-theme';
import useStore from 'hooks/use-store';
import Loader from 'components/common/loader';
import SideBarItem from './sidebarItem';

interface IProps {
  type: TSideBar;
}

const SideBarList: FC<IProps> = observer(({ type }) => {
  const theme = useTheme();
  const rootStore = useStore();
  const { checkoutStore } = rootStore;

  if ([null, 'menu'].includes(type)) {
    return null;
  }

  const currentStore = get(rootStore, `${type}Store`, null);

  return (
    <>
      <div css={titleWrapperCss(theme)}>
        <h2 css={titleCss}>
          {type !== null && type.toUpperCase()}({currentStore.length})
        </h2>
      </div>
      {type === 'basket' && checkoutStore.loading ? (
        <Loader />
      ) : (
        <>
          <ul css={itemsCss}>
            {(Array.from(currentStore.items) as Array<[string, IProduct]>).map(
              ([key, product]) => (
                <SideBarItem key={key} product={product} />
              )
            )}
          </ul>
          {type === 'basket' && (
            <div css={checkoutWrapperCss}>
              <div css={productsCss(theme)}>
                <span>Products</span>
                <span>
                  {(currentStore as BasketStore).aggregatedPrice.toFixed(2)} USD
                </span>
              </div>
              <div css={productsCss(theme)} style={{ borderBottom: 'none' }}>
                <span>Shipping</span>
                <span>
                  ${(currentStore as BasketStore).shipping.toFixed(2)} USD
                </span>
              </div>
              <div css={totalCss(theme)}>
                <span>Total</span>
                <span>{(currentStore as BasketStore).totalPrice} USD</span>
              </div>
              <Link to="/checkout" css={checkoutCss(theme)}>
                Go to Checkout
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
});

const titleWrapperCss = (theme: ITheme) => css`
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${theme.colors.red};
`;

const titleCss = css`
  font-size: 20px;
  text-align: center;
`;

const itemsCss = css`
  height: 100%;
  width: 100vw;
  max-width: 350px;
  overflow: scroll;
`;

const checkoutWrapperCss = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 50%;
  padding: 50px;
  background-color: #fff;
  transform: translateX(-50%);
`;

const productsCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding 15px 0;
  border-bottom: 1px solid ${theme.colors.red};

  span {
    ${theme.fontFamily('Oswald')};
    font-size: 14px;
  }
`;

const totalCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 25px;

  span {
    ${theme.fontFamily('Oswald')};
    font-size: 20px;
  }
`;

const checkoutCss = (theme: ITheme) => css`
  ${theme.fontFamily('MontSerrat-Bold')};
  position: relative;
  font-size: 18px;
  width: 100%;
  padding: 15px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.black};
  text-align: center;
  text-transform: uppercase;
  transition: 0.3s;

  &:hover {
    background-color: ${theme.colors.primary};
  }
`;

export default SideBarList;

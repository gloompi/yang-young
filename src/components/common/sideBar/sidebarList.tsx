import React, { FC } from 'react';
import get from 'lodash/get';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';

import { IProduct } from 'types/common';
import { TSideBar } from 'components/common/header';
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
              <button css={checkoutCss} onClick={checkoutStore.handleCheckout}>
                Checkout
              </button>
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
  overflow: scroll;
`;

const checkoutWrapperCss = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  bottom: 0;
  left: 50%;
  padding: 25px;
  background-color: #fff;
  transform: translateX(-50%);
`;

const checkoutCss = css`
  font-size: 25px;
  color: #000;
`;

export default SideBarList;

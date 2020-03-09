import React, { FC } from 'react';
import get from 'lodash/get';
import { css } from '@emotion/core';

import { IProduct } from 'types/common';
import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import { TSideBar } from 'components/common/header';
import SideBarItem from './sidebarItem';

interface IProps {
  type: TSideBar;
}

const SideBarList: FC<IProps> = ({ type }) => {
  const theme = useTheme();
  const rootStore = useStore();

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
      <ul css={itemsCss}>
        {(Array.from(currentStore.items) as Array<[string, IProduct]>).map(
          ([key, product]) => (
            <SideBarItem key={key} product={product} />
          )
        )}
      </ul>
    </>
  );
};

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

export default SideBarList;

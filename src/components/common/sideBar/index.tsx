import React, { FC, RefObject } from 'react';
import { css } from '@emotion/core';
import { IoMdClose } from 'react-icons/io';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import SideBarItem from './sidebarItem';

interface IProps {
  type: null | 'basket' | 'favourite';
  sideBarRef: RefObject<HTMLDivElement>;
  handleClose: () => void;
}

const SideBar: FC<IProps> = observer(({ type, sideBarRef, handleClose }) => {
  const theme = useTheme();
  const { basketStore, favouriteStore } = useStore();

  const currentStore = type === 'basket' ? basketStore : favouriteStore;

  return (
    <div css={wrapperCss(type !== null)}>
      <aside ref={sideBarRef} css={asideCss(theme, type !== null)}>
        <button css={closeBtnCss} onClick={handleClose}>
          <IoMdClose />
        </button>
        <div css={titleWrapperCss(theme)}>
          <h2 css={titleCss}>
            {type !== null && type.toUpperCase()}({currentStore.length})
          </h2>
        </div>
        <ul css={itemsCss}>
          {Array.from(currentStore.items).map(([key, product]) => (
            <SideBarItem key={key} product={product} />
          ))}
        </ul>
      </aside>
    </div>
  );
});

const wrapperCss = (open: boolean) => css`
  position: fixed;
  top: 0;
  left: ${open ? '0' : '100%'};
  width: 100vw;
  height: 100vh;
  background-color: rgba(52, 52, 52, 0.5);
  opacity: ${open ? 1 : 0};
  transition: 1s opacitty;
  z-index: 10000;
`;

const asideCss = (theme: ITheme, open: boolean) => css`
  position: absolute;
  right: 0;
  top: 0;
  height: 100vh;
  min-width: 200px;
  background-color: ${theme.colors.white};
  padding: 25px 50px;
  transform: translateX(${open ? '0' : '100%'});
  transition: 0.3s;
`;

const titleWrapperCss = (theme: ITheme) => css`
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${theme.colors.red};
`;

const titleCss = css`
  font-size: 20px;
  text-align: center;
`;

const closeBtnCss = css`
  position: absolute;
  font-size: 25px;
  left: 10px;
  top: 15px;
`;

const itemsCss = css`
  height: 100%;
  overflow: scroll;
`;

export default SideBar;

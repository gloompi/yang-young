import React, { FC, RefObject } from 'react';
import { css } from '@emotion/core';
import { IoMdClose } from 'react-icons/io';
import { observer } from 'mobx-react-lite';

import useTheme, { ITheme } from 'hooks/use-theme';
import { TSideBar } from 'components/common/header';

interface IProps {
  type: TSideBar;
  sideBarRef: RefObject<HTMLDivElement>;
  handleClose: () => void;
}

const SideBar: FC<IProps> = observer(
  ({ type, sideBarRef, handleClose, children }) => {
    const theme = useTheme();

    return (
      <div css={wrapperCss(type !== null)}>
        <aside ref={sideBarRef} css={asideCss(theme, type !== null)}>
          <button css={closeBtnCss} onClick={handleClose}>
            <IoMdClose />
          </button>
          {children}
        </aside>
      </div>
    );
  }
);

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

const closeBtnCss = css`
  position: absolute;
  font-size: 25px;
  left: 10px;
  top: 15px;
`;

export default SideBar;

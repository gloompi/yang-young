import React, { FC, useRef, useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import Image from 'gatsby-image';
import useTheme, { ITheme } from 'hooks/use-theme';
import { observer } from 'mobx-react-lite';
import { Waypoint } from 'react-waypoint';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdHelpCircleOutline, IoMdHeartEmpty } from 'react-icons/io';

import useLogo from 'hooks/use-logo';
import useStore from 'hooks/use-store';
import useOutsideClick from 'hooks/use-click-outside';
import SideBar from 'components/common/sideBar';
import HeaderMnu from './headerMnu';

const Header: FC = observer(() => {
  const [active, setActive] = useState(false);
  const [sideBarType, setSideBarType] = useState<null | 'basket' | 'favourite'>(
    null
  );
  const data = useLogo();
  const theme = useTheme();
  const { appStore, basketStore, favouriteStore } = useStore();
  const headerRef = useRef<HTMLHeadElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    setActive(false);
  };

  const handleLeave = () => {
    setActive(true);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    appStore.setLang(e.target.value);
  };

  useOutsideClick({
    node: sideBarRef,
    handleClickOutside: () => setSideBarType(null),
  });

  useEffect(() => {
    if (headerRef.current !== null) {
      appStore.setHeaderHeight(headerRef.current.offsetHeight);
    }
  });

  return (
    <div>
      <Waypoint bottomOffset={77} onEnter={handleEnter} onLeave={handleLeave} />
      <SideBar
        sideBarRef={sideBarRef}
        type={sideBarType}
        handleClose={() => setSideBarType(null)}
      />
      <header
        className={active ? 'active' : ''}
        css={headerStyle(theme)}
        ref={headerRef}
      >
        <Link to="/" css={logoCss}>
          {active ? (
            <Image fluid={data.image.fluid} style={{ width: 200 }} />
          ) : (
            <Image fluid={data.whiteImage.fluid} style={{ width: 200 }} />
          )}
        </Link>
        <HeaderMnu />
        <div css={headerTopList}>
          <select
            onChange={handleSelect}
            value={appStore.lang}
            style={{ marginRight: 15 }}
          >
            <option value="en">EN</option>
            <option value="cn">中文</option>
          </select>
          <button css={iconButton(theme)}>
            <IoMdHelpCircleOutline />
          </button>
          <button
            css={iconButton(theme)}
            onClick={() => setSideBarType('favourite')}
          >
            {favouriteStore.length > 0 && (
              <span css={iconPopup(theme)}>{favouriteStore.length}</span>
            )}
            <IoMdHeartEmpty />
          </button>
          <button
            css={iconButton(theme)}
            onClick={() => setSideBarType('basket')}
          >
            {basketStore.length > 0 && (
              <span css={iconPopup(theme)}>{basketStore.length}</span>
            )}
            <FiShoppingBag />
          </button>
        </div>
      </header>
    </div>
  );
});

const headerStyle = (theme: ITheme) => css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 96px;
  padding: 0 32px;
  color: ${theme.colors.white};
  background: linear-gradient(
    rgba(32, 32, 32, 0.5) 0%,
    rgba(32, 32, 32, 0) 100%
  );
  transition: 0.3s;
  z-index: 1000;

  &.active {
    min-height: 50px;
    background: linear-gradient(90deg, rgba(50, 50, 50) 0%, rgb(0, 0, 0) 100%);
  }
`;

const logoCss = css`
  display: flex;
  align-items: center;
  color: inherit;
  margin: 0;

  h1 {
    color: inherit;
  }
`;

const headerTopList = css`
  display: flex;
  align-items: center;
`;

const iconButton = (theme: ITheme) => css`
  position: relative;
  font-size: 22px;
  margin-right: 25px;
  color: inherit;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:last-child {
    margin-right: 0;
  }
`;

const iconPopup = (theme: ITheme) => css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  top: 100%;
  left: 100%;
  width: 20px;
  height: 20px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.red};
  border-radius: 50px;
  transform: translate(-50%, -80%);
`;

export default Header;

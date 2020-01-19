import React, { FC, useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import useTheme, { ITheme } from 'hooks/use-theme';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { observer } from 'mobx-react-lite';
import { Waypoint } from 'react-waypoint';

import useStore from 'hooks/use-store';

const Header: FC = observer(() => {
  const [active, setActive] = useState(false);
  const theme = useTheme();
  const appStore = useStore('appStore');
  const headerRef = useRef<HTMLHeadElement>(null);
  const { t } = useTranslation('common');

  const handleEnter = () => {
    setActive(false);
  };

  const handleLeave = () => {
    setActive(true);
  };

  useEffect(() => {
    if (headerRef.current !== null) {
      appStore.setHeaderHeight(headerRef.current.offsetHeight);
    }
  });

  return (
    <div>
      <Waypoint bottomOffset={77} onEnter={handleEnter} onLeave={handleLeave}/>
      <header
        className={active ? 'active' : ''}
        css={headerStyle(theme)}
        ref={headerRef}
      >
        <div css={headerTop(theme)}>
          <div css={headerTopList}>
            <button css={mnuButton(theme, active)}>
              <span />
            </button>
          </div>
          <h1 css={h1Style}>
            <Link to="/">{t('header.title')}</Link>
          </h1>
          <div css={headerTopList}>
            <button css={iconButton(theme)}>
              <FiSearch />
            </button>
            <button css={iconButton(theme)}>
              <IoMdHelpCircleOutline />
            </button>
            <button css={iconButton(theme)}>
              <FiShoppingBag />
            </button>
          </div>
        </div>
        <div css={headerBottom(theme)}>
          <ul css={headerBottomList}>
            <li css={headerItems(theme)}>
              <button>phone cases</button>
            </li>
            <li css={headerItems(theme)}>
              <button>phone bags</button>
            </li>
            <li css={headerItems(theme)}>
              <button>accessories</button>
            </li>
            <li css={headerItems(theme)}>
              <button>our story</button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
});

const headerStyle = (theme: ITheme) => css`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    color: ${theme.colors.text};
    background: #fff;
  }
`;

const headerTop = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 66px;
  width: 100%;
  padding: 0 ${theme.containerRange(168)};
`;

const headerTopList = css`
  display: flex;
  align-items: center;
`;

const mnuButton = (theme: ITheme, active: boolean) => css`
  position: relative;
  width: 20px;
  height: 16px;
  color: inherit;
  margin-right: 25px;
  transition: 0.3s;

  &:hover {
    span,
    &:after,
    &:before {
      background-color: ${theme.colors.primary};
    }
  }

  span,
  &:after,
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    border-radius: 5px;
    background-color: ${active ? theme.colors.text : theme.colors.white};
    transition: 0.3s;
  }

  span {
    top: 50%;
    transform: translateY(-50%);
  }

  &:before {
    top: 0;
  }

  &:after {
    bottom: 0;
  }
`;

const iconButton = (theme: ITheme) => css`
  font-size: 22px;
  margin-right: 25px;
  color: inherit;
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:last-child {
    margin-right: 0;
  }
`;

const headerBottom = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  width: 100%;
  padding: 0 ${theme.containerRange(168)};
`;

const headerBottomList = css`
  display: flex;
  align-items: flex-start;
`;

const headerItems = (theme: ITheme) => css`
  display: flex;
  align-items: flex-start;
  margin-right: 32px;

  &:hover {
    button {
      color: ${theme.colors.primary};
    }
  }

  &:last-child {
    margin-right: 0;
  }

  button {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: inherit;
    text-transform: uppercase;
    transition: 0.3s;
  }
`;

const h1Style = css`
  color: inherit;
  margin: 0;

  & > a {
    color: inherit;
  }
`;

export default Header;

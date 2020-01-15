import React, { FC, useRef, useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import useTheme, { ITheme } from 'hooks/use-theme';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';
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
        css={headerStyle}
        ref={headerRef}
        style={{
          color: active ? theme.colors.text : theme.colors.white,
          background: active
            ? '#fff'
            : 'linear-gradient(rgba(32, 32, 32, 0.5) 0%, rgba(32, 32, 32, 0) 100%)',
        }}
      >
        <div css={headerTop(theme)}>
          <div css={headerTopList}>
            <button css={mnuButton(theme, active)}>
              <span />
            </button>
            <button css={iconButton}>
              <FiSearch
                css={css`
                  margin-bottom: -2px;
                `}
              />
            </button>
          </div>
          <h1 css={h1Style}>
            <Link to="/">{t('header.title')}</Link>
          </h1>
          <div css={headerTopList}>
            <button css={iconButton}>
              <IoMdHeartEmpty />
            </button>
            <button css={iconButton}>
              <FiShoppingBag />
            </button>
          </div>
        </div>
        <div css={headerBottom(theme)}>
          <ul css={headerBottomList}>
            <li css={headerItems}>
              <button>for her</button>
            </li>
            <li css={headerItems}>
              <button>for him</button>
            </li>
          </ul>
          <ul css={headerBottomList}>
            <li css={headerItems}>
              <button>phone cases</button>
            </li>
            <li css={headerItems}>
              <button>wallet cases</button>
            </li>
            <li css={headerItems}>
              <button>charging</button>
            </li>
            <li css={headerItems}>
              <button>phone holders</button>
            </li>
            <li css={headerItems}>
              <button>screen protectors</button>
            </li>
            <li css={headerItems}>
              <button>accessories</button>
            </li>
            <li css={headerItems}>
              <button>sale</button>
            </li>
          </ul>
          <ul css={headerBottomList}>
            <li css={headerItems}>
              <button>track order</button>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
});

const headerStyle = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 96px;
  padding: 0 32px;
  transition: 0.3s;
  z-index: 1000;
`;

const headerTop = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 66px;
  width: 100%;
  padding: ${theme.containerRange};
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
  transition: .3s;

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

const iconButton = css`
  font-size: 22px;
  margin-right: 25px;
  color: inherit;

  &:last-child {
    margin-right: 0;
  }
`;

const headerBottom = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 30px;
  width: 100%;
  padding: ${theme.containerRange};
`;

const headerBottomList = css`
  display: flex;
  align-items: flex-start;
`;

const headerItems = css`
  display: flex;
  align-items: flex-start;
  margin-right: 32px;

  &:last-child {
    margin-right: 0;
  }

  button {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: inherit;
    text-transform: uppercase;
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

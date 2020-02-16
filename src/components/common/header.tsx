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
import useCategories from 'hooks/use-categories-without-products';

const Header: FC = observer(() => {
  const [active, setActive] = useState(false);
  const theme = useTheme();
  const { appStore } = useStore();
  const categores = useCategories();
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
      <Waypoint bottomOffset={77} onEnter={handleEnter} onLeave={handleLeave} />
      <header
        className={active ? 'active' : ''}
        css={headerStyle(theme)}
        ref={headerRef}
      >
        <Link to="/" css={logoCss}>
          <h1>{t('header.title')}</h1>
        </Link>

        <ul css={headerBottomList}>
          {categores.map(category => (
            <li key={category.id} css={headerItems(theme)}>
              <Link to={`/${category.name}`}>{category.title}</Link>
            </li>
          ))}
          <li css={headerItems(theme)}>
            <Link to="/story">our stories</Link>
          </li>
        </ul>
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
    color: ${theme.colors.text};
    background: #fff;
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

// const mnuButton = (theme: ITheme, active: boolean) => css`
//   position: relative;
//   width: 20px;
//   height: 16px;
//   color: inherit;
//   margin-right: 25px;
//   transition: 0.3s;

//   &:hover {
//     span,
//     &:after,
//     &:before {
//       background-color: ${theme.colors.primary};
//     }
//   }

//   span,
//   &:after,
//   &:before {
//     content: '';
//     position: absolute;
//     width: 100%;
//     height: 2px;
//     left: 0;
//     border-radius: 5px;
//     background-color: ${active ? theme.colors.text : theme.colors.white};
//     transition: 0.3s;
//   }

//   span {
//     top: 50%;
//     transform: translateY(-50%);
//   }

//   &:before {
//     top: 0;
//   }

//   &:after {
//     bottom: 0;
//   }
// `;

const iconButton = (theme: ITheme) => css`
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

  a {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: inherit;
    text-transform: uppercase;
  }
`;

export default Header;

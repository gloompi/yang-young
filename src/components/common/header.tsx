import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import useTheme, { ITheme } from 'hooks/use-theme';
import { FiSearch, FiShoppingBag } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';

const Header: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('common');

  return (
    <header css={headerStyle}>
      <div css={headerTop(theme)}>
        <div css={headerTopList}>
          <button css={mnuButton(theme)}>
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
          <li css={headerItems(theme)}>
            <button>for her</button>
          </li>
          <li css={headerItems(theme)}>
            <button>for him</button>
          </li>
        </ul>
        <ul css={headerBottomList}>
          <li css={headerItems(theme)}>
            <button>phone cases</button>
          </li>
          <li css={headerItems(theme)}>
            <button>wallet cases</button>
          </li>
          <li css={headerItems(theme)}>
            <button>charging</button>
          </li>
          <li css={headerItems(theme)}>
            <button>phone holders</button>
          </li>
          <li css={headerItems(theme)}>
            <button>screen protectors</button>
          </li>
          <li css={headerItems(theme)}>
            <button>accessories</button>
          </li>
          <li css={headerItems(theme)}>
            <button>sale</button>
          </li>
        </ul>
        <ul css={headerBottomList}>
          <li css={headerItems(theme)}>
            <button>track order</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

const headerStyle = css`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 96px;
  color: #fff;
  background-image: linear-gradient(
    rgba(32, 32, 32, 0.5) 0%,
    rgba(32, 32, 32, 0) 100%
  );
  padding: 0 32px;
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

const mnuButton = (theme: ITheme) => css`
  position: relative;
  width: 20px;
  height: 16px;
  margin-right: 25px;

  span,
  &:after,
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    border-radius: 5px;
    background-color: ${theme.colors.white};
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
  color: #fff;
  margin-right: 25px;

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

const headerItems = (theme: ITheme) => css`
  display: flex;
  align-items: flex-start;
  margin-right: 32px;

  &:last-child {
    margin-right: 0;
  }

  button {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: ${theme.colors.white};
    text-transform: uppercase;
  }
`;

const h1Style = css`
  color: #fff;
  margin: 0;

  & > a {
    color: #fff;
  }
`;

export default Header;

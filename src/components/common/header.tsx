import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css, SerializedStyles } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import useTheme, { ITheme } from 'hooks/use-theme';

interface IProps {
  title: string;
}

const Header: FC<IProps> = ({ title }) => {
  const theme = useTheme();
  const { t } = useTranslation('common');

  return (
    <header css={headerStyle}>
      <div css={headerTopStyle}>
        <div css={headerTopLeftStyle}>
          <button css={mnuButton(theme)}>
            <span />
          </button>
          <button>
            <FiSearch />
          </button>
        </div>
        <h1 css={h1Style}>
          <Link to="/">{t('header.title')}</Link>
        </h1>
        <h1 css={h1Style}>
          <Link to="/">{title}</Link>
        </h1>
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
  background-image: linear-gradient(rgba(32, 32, 32, 0.5) 0%, rgba(32, 32, 32, 0) 100%);
  padding: 0 25px;
`;

const headerTopStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: 100%;
`;

const headerTopLeftStyle = css`
  display: flex;
`;

const mnuButton = (theme: ITheme) => css`
  position: relative;
  width: 20px;
  height: 20px;

  span {
    position: absolute;
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    border-radius: 50%;
    background-color: ${theme.colors.white};
    transform: translateX(-50%);
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

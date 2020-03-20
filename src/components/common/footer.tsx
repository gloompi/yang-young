import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import useStore from 'hooks/use-store';
import useTemplatePages from 'hooks/use-template-pages';
import useTheme, { ITheme } from 'hooks/use-theme';

const Footer: FC = () => {
  const { appStore } = useStore();
  const theme = useTheme();
  const templatePages = useTemplatePages();

  return (
    <footer css={footerStyle}>
      <div css={containerStyle}>
        <span>© {new Date().getFullYear()}, Made with love by GloompiQue</span>
        <ul css={templatePagesCss(theme)}>
          {templatePages.map(page => (
            <Link key={page.title} to={`/${page.title}`}>
              {appStore.lang === 'cn' && page.titleCN
                ? page.titleCN
                : page.title}
            </Link>
          ))}
        </ul>
      </div>
    </footer>
  );
};

const footerStyle = css`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #fff;
  background: #000;
`;

const containerStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  width: 100%;
  padding: 0 calc((100vw - 1200px) / 2);
  margin: 0 25px;
`;

const templatePagesCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  height: 100%;

  a {
    color: ${theme.colors.white};
    margin-right: 15px;
    transition: 0.3s;

    &:hover {
      color: ${theme.colors.primary};
    }

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default Footer;

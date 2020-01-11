import React, { FC, Suspense } from 'react';
import { Global, css } from '@emotion/core';

import 'i18n';
import 'assets/fonts/fonts.css';

import { ThemeProvider } from 'hooks/use-theme';
import Header from 'components/common/header';

const Layout: FC = ({ children }) => {
  return (
    <ThemeProvider>
      <Suspense fallback={<span>Loading...</span>}>
        <Global styles={globalStyles} />
        <Header />
        <main css={mainStyle}>{children}</main>
        <footer css={footerStyle}>
          <div css={containerStyle}>
            © {new Date().getFullYear()}, Made with love by GloompiQue
          </div>
        </footer>
      </Suspense>
    </ThemeProvider>
  );
};

const mainStyle = css`
  background-color: rebeccapurple;
  width: 100%;
  min-height: calc(100vh - 50px);
`;

const footerStyle = css`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  color: #fff;
  background: rebeccapurple;
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

const globalStyles = css`
  * {
    list-style-type: none;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
    }
  }

  html,
  body {
    margin: 0;
    color: #555;
    font-family: Avenir, -apple-system, BlinkMacSystemFont, 'segoe UI', Roboto, Helvetica, sans-serif;
    font-size: 18px;
    line-hegiht: 1.4;

    > div {
      margin-top: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      color: #222;
      line-height: 1.1;
    }

    a {
      text-decoration: none;
      cursor: pointer;
    }

    button {
      border: none;
      background: transparent;
      cursor: pointer;
    }
  }
`;

export default Layout;

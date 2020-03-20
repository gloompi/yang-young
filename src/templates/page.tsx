import React, { FC } from 'react';
import { Link, graphql } from 'gatsby';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import parse from 'html-react-parser';
import get from 'lodash/get';

import env from 'config/env';
import { ITemplatePage } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import useStore from 'hooks/use-store';
import Layout from 'components/common/layout';

export const query = graphql`
  query($id: String) {
    api {
      templatePage(id: $id) {
        id
        title
        titleCN
        content
        contentCN
        coverImg
      }
      templatePages {
        id
        title
        titleCN
        content
        contentCN
        coverImg
      }
    }
  }
`;

interface IProps {
  data: {
    api: {
      templatePage: ITemplatePage;
      templatePages: ITemplatePage[];
    };
  };
}

const TemplatePage: FC<IProps> = observer(({ data }) => {
  const theme = useTheme();
  const { appStore } = useStore();
  const templatePage = get(data, 'api.templatePage', {});
  const templatePages: ITemplatePage[] = get(data, 'api.templatePages', []);

  return (
    <Layout>
      <div
        css={imageWrapperCss(theme)}
        style={{
          backgroundImage: `url(${env.mediaUrl}/${templatePage.coverImg})`,
        }}
      >
        <h1>
          {appStore.lang === 'en' ? templatePage.title : templatePage.titleCN}
        </h1>
      </div>
      <div css={wrapperCss}>
        <nav css={navCss(theme)}>
          {templatePages.map(page => (
            <Link key={page.id} to={`/${page.title}`} activeClassName="active">
              {appStore.lang === 'cn' && page.titleCN
                ? page.titleCN
                : page.title}
            </Link>
          ))}
        </nav>
        <div css={contentCss(theme)}>
          {appStore.lang === 'cn' && templatePage.contentCN
            ? parse(templatePage.contentCN)
            : parse(templatePage.content)}
        </div>
      </div>
    </Layout>
  );
});

const imageWrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: 504px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  h1 {
    color: ${theme.colors.primary};
  }
`;

const wrapperCss = css`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const navCss = (theme: ITheme) => css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 300px;
  min-height: 350px;
  padding: 50px 0 0 50px;
  background-color: ${theme.colors.grey};

  a {
    ${theme.fontFamily('Avenir-Bold')};
    font-size: 14px;
    color: ${theme.colors.black};
    text-transform: uppercase;
    margin-bottom: 15px;
    transition: 0.3s;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`;

const contentCss = (theme: ITheme) => css`
  padding: 50px;
  width: calc(100% - 300px);
  color: ${theme.colors.text};
`;

export default TemplatePage;

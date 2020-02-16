import React, { FC } from 'react';
import { css } from '@emotion/core';

import useTheme, { ITheme } from 'hooks/use-theme';
import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import PageWrapper from 'components/common/pageWrapper';

const IndexPage: FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <SEO title="Story" />
      <PageWrapper
        title="Story"
        contentStyles={contentStyles(theme)}
        image=""
      />
    </Layout>
  );
};

const contentStyles = (theme: ITheme) => css`
  width: 100%;
  padding: 0 ${theme.containerRange()};
`;

export default IndexPage;

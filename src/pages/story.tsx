import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';

import { ICategoryImage } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import PageWrapper from 'components/common/pageWrapper';
import List from 'components/accessories/list';

interface IResponse {
  image: ICategoryImage;
}

const IndexPage: FC = () => {
  const theme = useTheme();
  const response: IResponse = useStaticQuery(graphql`
    query {
      image: imageSharp(original: { src: { regex: "/story/" } }) {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Story" />
      <PageWrapper
        title="Story"
        contentStyles={contentStyles(theme)}
        image={response.image}
      />
    </Layout>
  );
};

const contentStyles = (theme: ITheme) => css`
  width: 100%;
  padding: 0 ${theme.containerRange()};
`;

export default IndexPage;

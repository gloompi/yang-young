import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';

import { ICategory } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import useStore from 'hooks/use-store';
import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import PageWrapper from 'components/common/pageWrapper';
import List from 'components/categories/list';

export const query = graphql`
  query($id: String) {
    api {
      categories(id: $id) {
        id
        name
        title
        coverImg
      }
    }
  }
`;

interface IProps {
  data: {
    id: string;
    api: {
      categories: ICategory[];
    };
  };
}

const CategoryPage: FC<IProps> = ({ data: { api } }) => {
  const theme = useTheme();
  const { productsStore } = useStore();
  const [category] = api.categories;

  useEffect(() => {
    productsStore.initialFetch(category.id);
  }, []);

  return (
    <Layout>
      <SEO title={category.title} />
      <PageWrapper
        title={category.title}
        contentStyles={contentStyles(theme)}
        image={category.coverImg}
      >
        <List categoryId={category.id} />
      </PageWrapper>
    </Layout>
  );
};

const contentStyles = (theme: ITheme) => css`
  width: 100%;
  padding: 0 ${theme.containerRange()};
`;

export default CategoryPage;

import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { observer } from 'mobx-react-lite';

import { ICategory } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import useStore from 'hooks/use-store';
import Layout from 'components/common/layout';
import SEO from 'components/common/seo';
import PageWrapper from 'components/common/pageWrapper';
import List from 'components/categories/list';
import Pagination from 'components/common/pagination';

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

const CategoryPage: FC<IProps> = observer(({ data: { api } }) => {
  const theme = useTheme();
  const { productsStore } = useStore();
  const [category] = api.categories;

  useEffect(() => {
    productsStore.fetchProducts({ category: category.id });
  }, []);

  const handlePageChange = (page: number) => {
    productsStore.fetchProducts({ category: category.id, page });
  };

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
      {!productsStore.loading && productsStore.pages > 1 && (
        <Pagination
          page={productsStore.page}
          pages={productsStore.pages}
          hasNext={productsStore.hasNext}
          hasPrev={productsStore.hasPrev}
          handlePageChange={handlePageChange}
        />
      )}
    </Layout>
  );
});

const contentStyles = (theme: ITheme) => css`
  width: 100%;
  padding: 0 ${theme.containerRange()};
`;

export default CategoryPage;

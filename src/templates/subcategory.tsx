import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import { observer } from 'mobx-react-lite';

import { ISubCategory } from 'types/common';
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
      subcategories(id: $id) {
        id
        name
        title
        pageImg
        category {
          id
        }
      }
    }
  }
`;

interface IProps {
  data: {
    id: string;
    api: {
      subcategories: ISubCategory[];
    };
  };
}

const SubCategoryPage: FC<IProps> = observer(({ data: { api } }) => {
  const theme = useTheme();
  const { productsStore } = useStore();
  const [subcategory] = api.subcategories;

  useEffect(() => {
    productsStore.fetchProducts({
      subcategory: subcategory.id,
    });
  }, []);

  const handlePageChange = (page: number) => {
    productsStore.fetchProducts({
      subcategory: subcategory.id,
      page,
    });
  };

  return (
    <Layout>
      <SEO title={subcategory.title} />
      <PageWrapper
        title={subcategory.title}
        contentStyles={contentStyles(theme)}
        image={subcategory.pageImg}
      >
        <List categoryId={subcategory.id} />
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

export default SubCategoryPage;

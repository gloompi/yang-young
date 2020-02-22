import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import useCategories from 'hooks/use-categories';
import Section from 'components/common/section';
import ProductListMedium from 'components/common/productsListMedium';

const Section2: FC = () => {
  const categories = useCategories();
  const { t } = useTranslation('home');

  return (
    <Section
      title={t('category.title')}
      description={t('category.description')}
      contentStyles={contentStyles}
    >
      {categories.map(category => (
        <ProductListMedium
          key={category.id}
          path={category.name}
          title={category.title}
          products={category.products}
          image={category.coverImg}
        />
      ))}
    </Section>
  );
};

const contentStyles = css`
  width: 100%;
`;

export default Section2;

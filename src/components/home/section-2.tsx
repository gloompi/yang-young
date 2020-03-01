import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import Section from 'components/common/section';
import Loader from 'components/common/loader';
import ProductListMedium from 'components/product/productsListMedium';

const Section2: FC = observer(() => {
  const { categoriesStore } = useStore();
  const { t } = useTranslation('home');

  return (
    <Section
      title={t('category.title')}
      description={t('category.description')}
      contentStyles={contentStyles}
    >
      {categoriesStore.loading && <Loader />}
      {categoriesStore.categories.map(category => (
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
});

const contentStyles = css`
  width: 100%;
`;

export default Section2;

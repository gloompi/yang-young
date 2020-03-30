import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import Section from 'components/common/section';
import Loader from 'components/common/loader';
import ProductListMedium from 'components/product/productsListMedium';

const Section2: FC = observer(() => {
  const theme = useTheme();
  const { categoriesStore } = useStore();
  const { t } = useTranslation('home');

  return (
    <Section
      title={t('category.title')}
      description={t('category.description')}
      contentStyles={contentStyles(theme)}
    >
      {categoriesStore.loading && <Loader />}
      {categoriesStore.categories.map(category => (
        <ProductListMedium
          key={category.id}
          path={`category/${category.name}`}
          title={category.title}
          products={category.products.nodes}
          image={category.coverImg}
        />
      ))}
    </Section>
  );
});

const contentStyles = (theme: ITheme) => css`
  width: 100%;
  padding-top: 120px;

  ${theme.applyMediaStyles({
    isDesktop: `
      padding 75px 25px 0;
    `,
  })}
`;

export default Section2;

import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import useHotProducts from 'hooks/use-hot-products';
import ProductsList from 'components/product/productsList';
import Section from 'components/common/section';

const Section2: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('home');
  const hotProducts = useHotProducts();
  const { appStore } = useStore();
  const products = hotProducts.map(product => ({
    ...product,
    title: appStore.lang === 'en' ? product.title : product.titleCN,
    subtitle: appStore.lang === 'en' ? product.subtitle : product.subtitleCN,
  }));

  return (
    <Section
      title={t('hot.title')}
      description={t('hot.description')}
      contentStyles={contentStyles(theme)}
    >
      <ProductsList path="hot" products={products} />
    </Section>
  );
};

const contentStyles = (theme: ITheme) => css`
  padding: 120px ${theme.containerRange()} 0;

  ${theme.applyMediaStyles({
    isDesktop: `
      padding 75px 25px 0;
    `,
  })}
`;

export default Section2;

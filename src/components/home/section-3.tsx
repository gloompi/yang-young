import React, { FC } from 'react';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';

import useTheme, { ITheme } from 'hooks/use-theme';
import useHotProducts from 'hooks/use-hot-products';
import ProductsList from 'components/product/productsList';
import Section from 'components/common/section';

const Section2: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('home')
  const hotProducts = useHotProducts();

  return (
    <Section
      title={t('hot.title')}
      description={t('hot.description')}
      contentStyles={contentStyles(theme)}
    >
      <ProductsList path="hot" products={hotProducts} />
    </Section>
  );
};

const contentStyles = (theme: ITheme) => css`
  padding: 0 ${theme.containerRange()};
`;

export default Section2;

import React, { FC } from 'react';
import { css } from '@emotion/core';

import useTheme, { ITheme } from 'hooks/use-theme';
import useHotProducts from 'hooks/use-hot-products';
import ItemsList from 'components/common/itemsList';
import Section from 'components/common/section';

const Section2: FC = () => {
  const theme = useTheme();
  const hotProducts = useHotProducts();

  return (
    <Section
      title="Hot sale products"
      description="The difference between a Designer and Developer when it comes to design skills, is the difference between shooting a bullet and throwing it"
      contentStyles={contentStyles(theme)}
    >
      <ItemsList path="hot" items={hotProducts} />
    </Section>
  );
};

const contentStyles = (theme: ITheme) => css`
  padding: ${theme.containerRange()};
`;

export default Section2;

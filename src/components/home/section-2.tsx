import React, { FC } from 'react';
import { css } from '@emotion/core';

import useCategories from 'hooks/use-categories';
import Section from 'components/common/section';
import ProductListMedium from 'components/common/productsListMedium';

const Section2: FC = () => {
  const categories = useCategories();

  return (
    <Section
      title="Categories"
      description="The difference between a Designer and Developer when it comes to design skills, is the difference between shooting a bullet and throwing it"
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

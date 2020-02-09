import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';

import { ICategory } from 'types/common';
import useCases from 'hooks/use-cases';
import useBags from 'hooks/use-bags';
import useAccessories from 'hooks/use-accessories';
import Section from 'components/common/section';
import ItemListMedium from 'components/common/itemsListMedium';

interface IResponse {
  api: {
    category1: ICategory[];
    category2: ICategory[];
    category3: ICategory[];
  };
}

const Section2: FC = () => {
  const cases = useCases();
  const bags = useBags();
  const accessories = useAccessories();

  const {
    api: {
      category1: [caseCategory],
      category2: [bagCategory],
      category3: [accessoryCategory],
    },
  }: IResponse = useStaticQuery(graphql`
    query {
      api {
        category1: categories(id: "1") {
          ...Category
        }
        category2: categories(id: "3") {
          ...Category
        }
        category3: categories(id: "2") {
          ...Category
        }
      }
    }

    fragment Category on API_CategoryType {
      id
      name
      title
      coverImg
    }
  `);

  return (
    <Section
      title="Categories"
      description="The difference between a Designer and Developer when it comes to design skills, is the difference between shooting a bullet and throwing it"
      contentStyles={contentStyles}
    >
      <ItemListMedium
        key={caseCategory.id}
        path={caseCategory.name}
        title={caseCategory.title}
        products={cases}
        image={caseCategory.coverImg}
      />
      <ItemListMedium
        key={bagCategory.id}
        path={bagCategory.name}
        title={bagCategory.title}
        products={bags}
        image={bagCategory.coverImg}
      />
      <ItemListMedium
        key={accessoryCategory.id}
        path={accessoryCategory.name}
        title={accessoryCategory.title}
        products={accessories}
        image={accessoryCategory.coverImg}
      />
    </Section>
  );
};

const contentStyles = css`
  width: 100%;
`;

export default Section2;

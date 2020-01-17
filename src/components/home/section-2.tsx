import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ICategoryImage } from 'types/common';
import useCases from 'hooks/use-cases-preview';
import ItemList from 'components/common/itemsList';

const Section2: FC = () => {
  const cases = useCases();

  const image: ICategoryImage = useStaticQuery(graphql`
    query {
      sharp: imageSharp(original: { src: { regex: "/cases/" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return <ItemList title="see all cases" items={cases} image={image} />;
};

export default Section2;

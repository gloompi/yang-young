import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ICategoryImage } from 'types/common';
import useMixedItems from 'hooks/use-mixed-items';
import ItemList from 'components/common/itemsList';

const Section2: FC = () => {
  const mixed = useMixedItems();

  const image: ICategoryImage = useStaticQuery(graphql`
    query {
      sharp: imageSharp(original: { src: { regex: "/all-products/" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return <ItemList title="all products" items={mixed} image={image} />;
};

export default Section2;

import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ICategoryImage } from 'types/common';
import useMixedItems from 'hooks/use-mixed-items';
import useAccessories from 'hooks/use-accessories';
import useScreenProtector from 'hooks/use-screen-protector';
import useGiftCards from 'hooks/use-gift-cards';
import ItemList from 'components/common/itemsList';
import ItemListMedium from 'components/common/itemsListMedium';
import ItemListLarge from 'components/common/itemsListLarge';

interface IResponse {
  sharp1: ICategoryImage;
  sharp2: ICategoryImage;
  sharp3: ICategoryImage;
  sharp4: ICategoryImage;
}

const Section2: FC = () => {
  const mixed = useMixedItems();
  const accessories = useAccessories();
  const protectors = useScreenProtector();
  const cards = useGiftCards();

  const result: IResponse = useStaticQuery(graphql`
    query {
      sharp1: imageSharp(original: { src: { regex: "/all-products/" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp2: imageSharp(original: { src: { regex: "/accessories/" } }) {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp3: imageSharp(original: { src: { regex: "/protector/" } }) {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp4: imageSharp(original: { src: { regex: "/card/" } }) {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return (
    <>
      <ItemList
        title="all products"
        path="all-products"
        items={mixed}
        image={result.sharp1}
      />
      <ItemListMedium
        title="Accessories"
        path="accessories"
        items={accessories}
        image={result.sharp2}
      />
      <ItemListLarge
        title="Screen Protectors"
        path="protectors"
        items={protectors}
        image={result.sharp3}
      />
      <ItemListMedium
        title="Gift Cards"
        path="gift-cards"
        items={cards}
        image={result.sharp4}
      />
    </>
  );
};

export default Section2;

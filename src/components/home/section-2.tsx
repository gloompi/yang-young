import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { ICategoryImage } from 'types/common';
import useCases from 'hooks/use-cases-preview';
import useWallets from 'hooks/use-wallets';
import useHolders from 'hooks/use-holders';
import useChargers from 'hooks/use-chargers';
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
  const cases = useCases();
  const wallets = useWallets();
  const holders = useHolders();
  const chargers = useChargers();

  const response: IResponse = useStaticQuery(graphql`
    query {
      sharp1: imageSharp(original: { src: { regex: "/cases/" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp2: imageSharp(original: { src: { regex: "/wallet/" } }) {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp3: imageSharp(original: { src: { regex: "/holder/" } }) {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp4: imageSharp(original: { src: { regex: "/charger/" } }) {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return (
    <>
      <ItemList
        path="cases"
        title="see all cases"
        items={cases}
        image={response.sharp1}
      />
      <ItemListMedium
        path="wallets"
        title="wallet cases"
        items={wallets}
        image={response.sharp2}
      />
      <ItemListLarge
        path="holders"
        title="Phone Holders"
        items={holders}
        image={response.sharp3}
      />
      <ItemListMedium
        path="chargers"
        title="chargers"
        items={chargers}
        image={response.sharp4}
      />
    </>
  );
};

export default Section2;

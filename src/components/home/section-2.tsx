import React, { FC } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { css } from '@emotion/core';

import { ICategoryImage } from 'types/common';
import useWallets from 'hooks/use-wallets';
import useChargers from 'hooks/use-chargers';
import useAccessories from 'hooks/use-accessories';
import Section from 'components/common/section';
import ItemListMedium from 'components/common/itemsListMedium';

interface IResponse {
  sharp1: ICategoryImage;
  sharp2: ICategoryImage;
  sharp3: ICategoryImage;
  sharp4: ICategoryImage;
}

const Section2: FC = () => {
  const wallets = useWallets();
  const chargers = useChargers();
  const accessories = useAccessories();

  const response: IResponse = useStaticQuery(graphql`
    query {
      sharp2: imageSharp(original: { src: { regex: "/wallet/" } }) {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
      sharp3: imageSharp(original: { src: { regex: "/accessories/" } }) {
        fluid(maxWidth: 600) {
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
    <Section
      title="Categories"
      description="The difference between a Designer and Developer when it comes to design skills, is the difference between shooting a bullet and throwing it"
      contentStyles={contentStyles}
    >
      <ItemListMedium
        path="cases"
        title="phone cases"
        items={wallets}
        image={response.sharp2}
      />
      <ItemListMedium
        path="bags"
        title="phone bags"
        items={chargers}
        image={response.sharp4}
      />
      <ItemListMedium
        title="Accessories"
        path="accessories"
        items={accessories}
        image={response.sharp3}
      />
    </Section>
  );
};

const contentStyles = css`
  width: 100%;
`;

export default Section2;

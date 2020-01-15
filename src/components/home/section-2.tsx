import React, { FC } from 'react';
import { css } from '@emotion/core';
import { graphql, useStaticQuery, Link } from 'gatsby';
import Image, { FluidObject } from 'gatsby-image';

import useCases from 'hooks/use-cases-preview';
import useTheme, { ITheme } from 'hooks/use-theme';
import CardItem from 'components/common/cardItem';

interface IImage {
  sharp: {
    fluid: FluidObject;
  };
}

const Section2: FC = () => {
  const theme = useTheme();
  const cases = useCases();

  const image: IImage = useStaticQuery(graphql`
    query {
      sharp: imageSharp(original: { src: { regex: "/cases/" } }) {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  `);

  return (
    <div css={wrapperCss(theme)}>
      <ul css={listCss}>
        {cases.map(({ id, imgSrc, title, subtitle, price, specialOffers }) => (
          <CardItem
            key={id}
            link={`/cases/${id}`}
            imgSrc={imgSrc}
            title={title}
            subtitle={subtitle}
            price={price}
            specialOffers={specialOffers}
          />
        ))}
        <Link to="/cases" css={linkToCasesCss}>
          <Image fluid={image.sharp.fluid} css={categoryImageCss} />
        </Link>
      </ul>
    </div>
  );
};

const wrapperCss = (theme: ITheme) => css`
  width: 100%;
  min-height: 100vh;
  padding: 84px ${theme.containerRange()};
  background-color: ${theme.colors.white};
`;

const listCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const linkToCasesCss = css`
  position: relative;
  width: 24%;
  height: 620px;
`;

const categoryImageCss = css`
  width: 100%;
  height: 100%;
`;

export default Section2;

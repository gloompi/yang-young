import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import BackgroundImage from 'gatsby-background-image';
import { css } from '@emotion/core';

import useTheme, { ITheme } from 'hooks/use-theme';
import Dots from 'components/common/dots';

import Layout from 'components/common/layout';

export const query = graphql`
  query($id: String) {
    mdx(frontmatter: { id: { eq: $id } }) {
      frontmatter {
        id
        title
        subtitle
        price
        specialOffers
        imgSrc {
          sharp: childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      body
    }
  }
`;

interface IProps {
  data: {
    mdx: {
      frontmatter: {
        id: string;
        title: string;
        subtitle: string;
        price: string;
        specialOffers: string[];
        imgSrc: {
          sharp: {
            fluid: FluidObject;
          };
        };
      };
      body: string;
    };
  };
}

const ItemPage: FC<IProps> = ({ data: { mdx: item } }) => {
  const theme = useTheme();

  return (
    <Layout>
      <section css={sectionStyles(theme)}>
        <div css={containerStyles}>
          <BackgroundImage
            Tag="div"
            fluid={item.frontmatter.imgSrc.sharp.fluid}
            css={bgStyles}
            fadeIn={true}
          >
            <div css={shadowStyles} />
            <h2 css={h2Styles(theme)}>{item.frontmatter.title}</h2>
            {item.frontmatter.subtitle && <Dots />}
            {item.frontmatter.subtitle && (
              <p css={descriptionStyles(theme)}>{item.frontmatter.subtitle}</p>
            )}
          </BackgroundImage>
          <div css={contentStyles(theme)}>
            <MDXRenderer>{item.body}</MDXRenderer>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const sectionStyles = (theme: ITheme) => css`
  position: relative;
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  width: 100%;
`;

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
`;

const contentStyles = (theme: ITheme) => css`
  padding: 80px ${theme.containerRange()};
`;

const bgStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
`;

const shadowStyles = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const h2Styles = (theme: ITheme) => css`
  position: relative;
  font-family: Hind-Bold, sans-serif;
  font-size: 28px;
  color: ${theme.colors.white};
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 15px;
`;

const descriptionStyles = (theme: ITheme) => css`
  position: relative;
  font-family: Hind, sans-serif;
  font-size: 16px;
  line-height: 2;
  text-align: center;
  margin-top: 20px;
  color: ${theme.colors.white};
  padding: 0 calc((100vw - 750px) / 2);
`;

export default ItemPage;

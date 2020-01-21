import React, { FC } from 'react';
import { graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import { css } from '@emotion/core';
import { MDXRenderer } from 'gatsby-plugin-mdx';

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
            fluid(maxWidth: 300) {
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
  return (
    <Layout>
      <h3 css={labelStyles}>{item.frontmatter.subtitle}</h3>
      <h1>{item.frontmatter.title}</h1>
      <p>
        <MDXRenderer>{item.body}</MDXRenderer>
      </p>
    </Layout>
  );
};

const labelStyles = css`
  white-space: nowrap;
  font-size: 22px;
  line-height: 34px;
  font-weight: 300;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 19px;
`;

export default ItemPage;

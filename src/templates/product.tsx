import React, { FC, useEffect } from 'react';
import { graphql } from 'gatsby';
import parse from 'html-react-parser';
import { css } from '@emotion/core';

import env from 'config/env';
import { IProduct } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';
import Dots from 'components/common/dots';
import Layout from 'components/common/layout';

export const query = graphql`
  query($slug: String) {
    api {
      products(slug: $slug) {
        slug
        title
        subtitle
        price
        coverImg
        description
        specialOffers {
          name
        }
      }
    }
  }
`;

interface IProps {
  data: {
    api: {
      products: IProduct[];
    };
  };
}

const ProductPage: FC<IProps> = ({ data }) => {
  const theme = useTheme();
  const product = data.api.products[0];

  useEffect(() => {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://yang-young.disqus.com/embed.js';
    s.setAttribute('data-timestamp', `${+new Date()}`);
    (d.head || d.body).appendChild(s);
  }, []);

  return (
    <Layout>
      <section css={sectionStyles(theme)}>
        <div css={containerStyles}>
          <div css={bgStyles(`${env.mediaUrl}/${product.coverImg}`)}>
            <div css={shadowStyles} />
            <h2 css={h2Styles(theme)}>{product.title}</h2>
            {product.subtitle && <Dots />}
            {product.subtitle && (
              <p css={descriptionStyles(theme)}>{product.subtitle}</p>
            )}
          </div>
          <div css={contentStyles(theme)}>{parse(product.description)}</div>
        </div>
      </section>
      <div css={commentSection(theme)}>
        <div id="disqus_thread" />
      </div>
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

const bgStyles = (imgSrc: string) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  background: url(${imgSrc}) center no-repeat;
  background-size: cover;
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

const commentSection = (theme: ITheme) => css`
  padding: 80px ${theme.containerRange()};
`;

export default ProductPage;

import React, { FC, useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';
import Rating from 'react-rating';
import parse from 'html-react-parser';

import env from 'config/env';
import { IProduct } from 'types/common';
import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import Layout from 'components/common/layout';

export const query = graphql`
  query($slug: String) {
    api {
      product(slug: $slug) {
        slug
        title
        titleCN
        subtitle
        subtitleCN
        price
        coverImg
        animatedImg
        description
        descriptionCN
        rating
        pictures {
          id
          name
          image
        }
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
      product: IProduct;
    };
  };
}

const ProductPage: FC<IProps> = observer(({ data }) => {
  const [image, setImage] = useState<string | null>(null);
  const { t } = useTranslation('common');
  const { appStore, basketStore } = useStore();
  const theme = useTheme();

  const product = data.api.product;
  const inBasket = basketStore.items.has(product.slug);

  const init = () => {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://yang-young.disqus.com/embed.js';
    s.setAttribute('data-timestamp', `${+new Date()}`);
    (d.head || d.body).appendChild(s);
  };

  useEffect(() => {
    setImage(product.coverImg);
    init();
  }, []);

  const handleTumbClick = (tumbnail: string) => () => {
    setImage(tumbnail);
  };

  const handleAddToBasket = (item: IProduct) => () => {
    basketStore.addToBusket(item.slug, item);
  };

  return (
    <Layout>
      <section css={sectionStyles(theme)}>
        <div css={containerStyles}>
          <div css={leftSideStyles}>
            <h3 css={titleStyles(theme)}>
              {appStore.lang === 'en' ? product.title : product.titleCN}
            </h3>
            <span css={subtitleStyles(theme)}>
              {appStore.lang === 'en' ? product.subtitle : product.subtitleCN}
            </span>
            <Rating
              start={0}
              stop={5}
              initialRating={product.rating}
              fullSymbol={
                <IoMdStar
                  style={{
                    fontSize: 25,
                    color: theme.colors.primary,
                  }}
                />
              }
              emptySymbol={<IoMdStarOutline style={{ fontSize: 25 }} />}
              readonly={true}
            />
            <span css={priceStyles(theme)}>
              Price: <b>{product.price}$</b>
            </span>
            <button
              css={basketButtonStyles(theme, inBasket)}
              onClick={handleAddToBasket(product)}
            >
              {inBasket ? t('button.in_basket') : t('button.add_to_basket')}
            </button>
          </div>
          <div css={rightSideStyles}>
            <img
              src={`${env.mediaUrl}/${image}`}
              css={imageStyles}
              alt="product image"
            />
            <ul css={tumbnailsList}>
              <li css={tumbnailItem}>
                <img
                  src={`${env.mediaUrl}/${product.coverImg}`}
                  css={tumbnailStyles(image === product.coverImg)}
                  onClick={handleTumbClick(product.coverImg)}
                  alt="tumbnail"
                />
              </li>
              {product.pictures.map(picture => (
                <li key={picture.name} css={tumbnailItem}>
                  <img
                    src={`${env.mediaUrl}/${picture.image}`}
                    css={tumbnailStyles(image === picture.image)}
                    onClick={handleTumbClick(picture.image)}
                    alt="tumbnail"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div css={descriptionStyles}>
        {parse(
          appStore.lang === 'en' ? product.description : product.descriptionCN
        )}
      </div>
      <div css={commentSection(theme)}>
        <div id="disqus_thread" />
      </div>
    </Layout>
  );
});

const sectionStyles = (theme: ITheme) => css`
  position: relative;
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
  padding: 50px ${theme.containerRange()} 0px;
  width: 100%;
`;

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 50px;
`;

const leftSideStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 50%;
`;

const rightSideStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  width: 50%;
  padding: 0 50px;
`;

const titleStyles = (theme: ITheme) => css`
  ${theme.fontFamily('MontSerrat-Black')};
  font-size: 35px;
  text-transform: uppercase;
`;

const subtitleStyles = (theme: ITheme) => css`
  ${theme.fontFamily('Oswald')};
  font-size: 20px;
  margin-bottom: 15px;
`;

const priceStyles = (theme: ITheme) => css`
  position: relative;
  font-size: 18px;
  padding-top: 15px;
  margin: 15px 0;
  border-top: 1px solid ${theme.colors.yellow};
`;

const basketButtonStyles = (theme: ITheme, inBasket: boolean) => css`
  ${theme.fontFamily('MontSerrat-Bold')};
  font-size: 18px;
  padding: 15px 50px;
  color: ${theme.colors.white};
  background-color: ${inBasket ? theme.colors.grey : theme.colors.primary};
  border: 1px solid ${inBasket ? theme.colors.grey : theme.colors.primary};
  border-radius: 15px;
  transition: 0.3s;
  cursor: ${inBasket ? 'not-allowed' : 'pointer'};

  ${!inBasket
    ? `&:hover {
      color: ${theme.colors.primary};
      background-color: ${theme.colors.white};
    }`
    : ''}
`;

const imageStyles = css`
  width: 100%;
  margin-bottom: 25px;
`;

const tumbnailStyles = (active: boolean) => css`
  width: 100%;
  padding-bottom: 5px;
  border-bottom: ${active ? '2px solid #ccc' : ''};
  transition: 0.3s;

  &:hover {
    border-bottom: 2px solid rgba(150, 150, 150, 0.3);
  }
`;

const tumbnailsList = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  overflow-x: scroll;
`;

const tumbnailItem = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  margin-right: 25px;
  cursor: pointer;
`;

const descriptionStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 25px 0;
  margin: 25px 0;
`;

const commentSection = (theme: ITheme) => css`
  padding: 80px ${theme.containerRange()};
`;

export default ProductPage;

import React, { FC, MouseEvent } from 'react';
import isEmpty from 'lodash/isEmpty';
import { observer } from 'mobx-react-lite';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';

import env from 'config/env';
import { IProduct } from 'types/common';
import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';

interface IProps {
  product: IProduct;
  link: string;
  itemsCount: number;
}

const ProductPreview: FC<IProps> = observer(
  ({ product, link, itemsCount = 1 }) => {
    const theme = useTheme();
    const { basketStore, favouriteStore } = useStore();
    const {
      coverImg,
      animatedImg,
      title,
      subtitle,
      specialOffers,
      price,
    } = product;

    const activeBasket = basketStore.items.has(product.slug);
    const activeFavourite = favouriteStore.items.has(product.slug);

    const handleToggleFavourite = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (favouriteStore.items.has(product.slug)) {
        favouriteStore.removeFromFavourite(product.slug);
      } else {
        favouriteStore.addToFavourite(product.slug, product);
      }
    };

    const handleToggleBasket = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (basketStore.items.has(product.slug)) {
        basketStore.removeFromBasket(product.slug);
      } else {
        basketStore.addToBusket(product.slug, product);
      }
    };

    return (
      <li css={itemCss(theme, itemsCount)}>
        <article css={articleCss}>
          <Link to={link} css={linkCss(theme, !isEmpty(animatedImg))}>
            <img
              src={`${env.mediaUrl}/${coverImg}`}
              css={imageCss(!isEmpty(animatedImg))}
              className="front"
            />
            {!isEmpty(animatedImg) && (
              <div css={flipBackground} className="back">
                <img src={`${env.mediaUrl}/${animatedImg}`} />
              </div>
            )}
            <ul css={specialsListCss}>
              {specialOffers.map(({ name }, idx) => (
                <li key={idx} css={specialItemCss(theme)}>
                  {name}
                </li>
              ))}
            </ul>
            <div css={textWrapCss}>
              <h3 css={titleCss}>{title}</h3>
              <span css={subtitleCss}>{subtitle}</span>
            </div>
            <div css={bottomWrapCss}>
              <button
                css={iconCss(theme, activeFavourite)}
                onClick={handleToggleFavourite}
              >
                <IoMdHeartEmpty />
              </button>
              <span css={priceCss}>{price}$</span>
              <button
                css={iconCss(theme, activeBasket)}
                onClick={handleToggleBasket}
              >
                <FiShoppingBag />
              </button>
            </div>
          </Link>
        </article>
      </li>
    );
  }
);

const itemCss = (theme: ITheme, itemsCount: number) => css`
  position: relative;
  width: calc(${100 / itemsCount}% - 1%);
  margin-right: 1.5%;
  background-color: ${theme.colors.grey};

  &:nth-of-type(${itemsCount}n + ${itemsCount}) {
    margin-right: 0;
  }

  ${theme.applyMediaStyles({
    isPhone: `
      width: 100%;
      margin-right: 0;
      margin-bottom: 25px;

      &:last-child {
        margin-bottom: 0;
      }
    `,
  })}
`;

const articleCss = css`
  width: 100%;
  height: 100%;
`;

const flipBackground = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  padding: 20px 0;
  transition: 0.7s;

  img {
    width: 100%;
  }
`;

const linkCss = (theme: ITheme, animated: boolean) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: ${theme.colors.black};
  padding: 20px 0;

  ${animated
    ? `&:hover {
      .front {
        opacity: 1;
        transform: scale(1);
      }
      .back {
        opacity: 0;
      }
    }`
    : ''}
`;

const imageCss = (animated: boolean) => css`
  min-height: 200px;
  width: 100%;
  backface-visibility: hidden;
  transition: 0.7s;
  opacity: ${animated ? '0' : '1'};
  transform: scale(0.75);
`;

const specialsListCss = css`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-right: 20px;
`;

const specialItemCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  width: 42.56px;
  height: 42.56px;
  border-radius: 50%;
  margin-bottom: 8px;
  font-family: MontSerrat-Bold;
  font-size: 8px;
  text-align: center;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-of-type(odd) {
    background-color: ${theme.colors.red};
  }

  &:nth-of-type(even) {
    background-color: ${theme.colors.black};
  }
`;

const textWrapCss = css`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const titleCss = css`
  font-weight: 500;
  font-family: Avenir-Bold;
  font-size: calc(13px + (3 * (100vw - 320px)) / 1120);
  line-height: 1.2em;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  margin: 0px 0px 4px;
  padding: 0px;
  overflow: hidden;
`;

const subtitleCss = css`
  font-weight: 400;
  line-height: 1.2em;
  font-family: Avenir;
  font-size: calc(10px + (2 * (100vw - 320px)) / 1120);
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
`;

const bottomWrapCss = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const iconCss = (theme: ITheme, active: boolean) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 43px;
  height: 43px;
  color: ${active ? theme.colors.white : theme.colors.black};
  background-color: ${active ? theme.colors.primary : theme.colors.white};
  border-radius: 50%;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const priceCss = css`
  letter-spacing: 0.5px;
  line-height: 1em;
  font-family: MontSerrat-Bold;
  font-size: calc(10px + (6 * (100vw - 320px)) / 1120);
`;

export default ProductPreview;

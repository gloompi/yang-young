import React, { FC } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { FiShoppingBag } from 'react-icons/fi';
import { IoMdHeartEmpty } from 'react-icons/io';

import env from 'config/env';
import { IProduct } from 'types/common';
import useTheme, { ITheme } from 'hooks/use-theme';

interface IProps extends IProduct {
  link: string;
  itemsCount: number;
}

const ProductPreview: FC<IProps> = ({
  link,
  coverImg,
  animatedImg,
  title,
  subtitle,
  specialOffers,
  price,
  itemsCount = 1,
}) => {
  const theme = useTheme();

  return (
    <li css={itemCss(theme, itemsCount, !isEmpty(animatedImg))}>
      <article css={articleCss(!isEmpty(animatedImg))} className="front">
        <Link to={link} css={linkCss(theme)}>
          <img src={`${env.mediaUrl}/${coverImg}`} css={imageCss} />
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
            <button css={iconCss(theme)}>
              <IoMdHeartEmpty />
            </button>
            <span css={priceCss}>{price}$</span>
            <button css={iconCss(theme)}>
              <FiShoppingBag />
            </button>
          </div>
        </Link>
      </article>
      {!isEmpty(animatedImg) && (
        <div css={flipBackground} className="back">
          <img src={`${env.mediaUrl}/${animatedImg}`} />
        </div>
      )}
    </li>
  );
};

const itemCss = (theme: ITheme, itemsCount: number, animated: boolean) => css`
  position: relative;
  width: calc(${100 / itemsCount}% - 1%);
  margin-right: 1.5%;
  background-color: ${theme.colors.grey};
  perspective: 1000px;

  ${
    animated
      ? `&:hover {
      .front {
        transform: rotateY(360deg);
      }
      .back {
        transform: rotateY(180deg);
      }
    }`
      : ''
  }

  &:nth-of-type(${itemsCount}n + ${itemsCount}) {
    margin-right: 0;
  }
`;

const articleCss = (animated: boolean) => css`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  ${animated ? `transform: rotateY(180deg);` : ''}
  transition: 0.5s;
`;

const flipBackground = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  transition: 0.5s;

  img {
    width: 100%;
  }
`;

const linkCss = (theme: ITheme) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: ${theme.colors.black};
  padding: 20px 0;
`;

const imageCss = css`
  min-height: 200px;
  width: 100%;
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

const iconCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  width: 43px;
  height: 43px;
  color: ${theme.colors.black};
  background-color: ${theme.colors.white};
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

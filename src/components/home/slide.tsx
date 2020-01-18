import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

import useTheme, { ITheme } from 'hooks/use-theme';
import { IPrettySlide } from 'hooks/use-slides';

interface IProps {
  slide: IPrettySlide;
}

const Slide: FC<IProps> = ({ slide }) => {
  const theme = useTheme();

  return (
    <BackgroundImage Tag="div" fluid={slide.fluid} css={bgStyles} fadeIn={true}>
      <h3 css={labelStyles(theme)}>{slide.label}</h3>
      <h1 css={titleStyles(theme)}>{slide.title}</h1>
      <p css={descriptionStyles(theme)}>{slide.body}</p>
      <Link to={`/${slide.slug}/`} css={linkStyles(theme)}>
        Read the article
      </Link>
    </BackgroundImage>
  );
};

const bgStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const labelStyles = (theme: ITheme) => css`
  white-space: nowrap;
  font-size: 22px;
  line-height: 34px;
  font-weight: 300;
  color: ${theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 19px;
`;

const titleStyles = (theme: ITheme) => css`
  white-space: nowrap;
  font-family: Hind-Bold, sans-serif;
  font-size: 65px;
  color: ${theme.colors.white};
  text-transform: uppercase;
  z-index: 6;
  letter-spacing: 9px;
  line-height: 129px;
  border-width: 0px;
  margin: 0;
  padding: 0;
  opacity: 1;
`;

const descriptionStyles = (theme: ITheme) => css`
  white-space: nowrap;
  line-height: 29px;
  font-family: Hind, sans-serif;
  font-size: 18px;
  color: ${theme.colors.white};
  text-align: center;
  margin: 0;
  padding: 0;
`;

const linkStyles = (theme: ITheme) => css`
  font-family: Hind-Medium, sans-serif;
  font-size: 20px;
  line-height: 22px;
  border-width: 2px;
  margin-top: 50px;
  padding: 13px 30px 12px;
  letter-spacing: 1px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.secondary};
    background-color: ${theme.colors.white};
  }
`;

export default Slide;

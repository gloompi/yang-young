import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import env from 'config/env';
import useTheme, { ITheme } from 'hooks/use-theme';
import { IExtendedSlide } from 'stores/slidesStore';

interface IProps {
  slide: IExtendedSlide;
}

const Slide: FC<IProps> = ({ slide }) => {
  const theme = useTheme();

  return (
    <div css={bgStyles(slide.coverImg)}>
      <h1 css={titleStyles(theme)}>{slide.title}</h1>
      <p css={descriptionStyles(theme)}>{slide.description}</p>
    </div>
  );
};

const bgStyles = (coverImg: string) => css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url(${env.mediaUrl}/${coverImg}) no-repeat center;
  background-size: cover;

  * {
    position: relative;
  }
`;

const titleStyles = (theme: ITheme) => css`
  font-family: Hind-Bold, sans-serif;
  font-size: 65px;
  color: ${theme.colors.white};
  width: 100%;
  text-transform: uppercase;
  text-align: center;
  z-index: 6;
  letter-spacing: 9px;
  border-width: 0px;
  margin: 0;
  padding: 0 25px;
  margin-bottom: 50px;
  opacity: 1;

  ${theme.applyMediaStyles({
    isDesktop: `
      font-size: 50px;
      letter-spacing: 7px;
      margin-bottom: 35px;
    `,
    isTablet: `
      font-size: 40px;
      letter-spacing: 3px;
      margin-bottom: 25px;
    `,
  })}
`;

const descriptionStyles = (theme: ITheme) => css`
  white-space: nowrap;
  line-height: 29px;
  font-family: Hind, sans-serif;
  font-size: 45px;
  color: ${theme.colors.white};
  text-align: center;
  margin: 0;
  padding: 0;

  ${theme.applyMediaStyles({
    isDesktop: `
      font-size: 35px;
    `,
    isTablet: `
      font-size: 25px;
    `,
  })}
`;

const linkStyles = (theme: ITheme) => css`
  font-family: Hind-Medium, sans-serif;
  font-size: 20px;
  line-height: 22px;
  border-width: 2px;
  margin-top: 50px;
  padding: 13px 30px 12px;
  letter-spacing: 1px;
  text-align: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.primary};
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
  }
`;

export default Slide;

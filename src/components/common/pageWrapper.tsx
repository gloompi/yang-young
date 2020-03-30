import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import env from 'config/env';
import useTheme, { ITheme } from 'hooks/use-theme';
import Dots from 'components/common/dots';

interface IProps {
  title: string;
  image: string;
  description?: string;
  contentStyles?: SerializedStyles;
}

const Section: FC<IProps> = ({
  title,
  image,
  description,
  contentStyles,
  children,
}) => {
  const theme = useTheme();

  return (
    <section css={sectionStyles(theme)}>
      <div css={containerStyles}>
        <div css={bgStyles(image)}>
          <div css={shadowStyles} />
          <h2 css={h2Styles(theme)}>{title}</h2>
          {description && <Dots />}
          {description && <p css={descriptionStyles(theme)}>{description}</p>}
        </div>
        <div css={contentStyles} style={{ paddingTop: 120 }}>
          {children}
        </div>
      </div>
    </section>
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

const bgStyles = (img: string) => css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 80vh;
  background: url(${env.mediaUrl}/${img}) no-repeat center;
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

export default Section;

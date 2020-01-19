import React, { FC } from 'react';
import { css, SerializedStyles } from '@emotion/core';

import useTheme, { ITheme } from 'hooks/use-theme';
import Dots from 'components/common/dots';

interface IProps {
  title: string;
  description?: string;
  contentStyles?: SerializedStyles;
}

const Section: FC<IProps> = ({
  title,
  description,
  contentStyles,
  children,
}) => {
  const theme = useTheme();

  return (
    <section css={sectionStyles(theme)}>
      <div css={containerStyles}>
        <h2 css={h2Styles(theme)}>{title}</h2>
        <Dots />
        {description && <p css={descriptionStyles(theme)}>{description}</p>}
        <div css={contentStyles} style={{ paddingTop: 120 }}>
          {children}
        </div>
      </div>
    </section>
  );
};

const sectionStyles = (theme: ITheme) => css`
  padding: 120px 0 0;
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
`;

const h2Styles = (theme: ITheme) => css`
  font-family: Hind-Bold, sans-serif;
  font-size: 28px;
  color: ${theme.colors.black};
  line-height: 1.4;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 15px;
`;

const descriptionStyles = (theme: ITheme) => css`
  font-family: Hind, sans-serif;
  font-size: 16px;
  line-height: 2;
  text-align: center;
  margin-top: 20px;
  color: ${theme.colors.black};
  padding: 0 calc((100vw - 750px) / 2);
`;

export default Section;

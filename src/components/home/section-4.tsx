import React from 'react';
import { css } from '@emotion/core';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import useTheme, { ITheme } from 'hooks/use-theme';
import useDeliverables from 'hooks/use-deliverables';
import Section from 'components/common/section';
import Dots from 'components/common/dots';

const Section2 = () => {
  const deliverables = useDeliverables();
  const theme = useTheme();

  return (
    <Section
      title="WHY CHOOSE US?"
      description="The difference between a Designer and Developer when it comes to design skills, is the difference between shooting a bullet and throwing it"
      contentStyles={contentStyles(theme)}
    >
      <ul css={listStyles}>
        {deliverables.map((item, idx) => {
          const { [item.icon]: Icon } = require('react-icons/fa');

          return (
            <li key={idx} css={itemStyles}>
              <span css={iconWrapper(theme)}>
                <Icon css={iconStyles(theme)} />
              </span>
              <h3 css={titleStyles(theme)}>{item.title}</h3>
              <Dots />
              <div css={descrStyles(theme)}>
                <MDXRenderer>{item.body}</MDXRenderer>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

const contentStyles = (theme: ITheme) => css`
  padding: ${theme.containerRange()};
`;

const listStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  min-height: 200px;
`;

const itemStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  width: 33.3%;
  padding: 0 15px;
`;

const iconWrapper = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid ${theme.colors.primary};
  border-radius: 50%;
`;

const iconStyles = (theme: ITheme) => css`
  font-size: 40px;
  color: ${theme.colors.primary};
`;

const titleStyles = (theme: ITheme) => css`
  font-family: Hind-Bold;
  font-size: 20px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.black};
  margin: 20px 0 30px;
`;

const descrStyles = (theme: ITheme) => css`
  font-family: Hind-light;
  font-size: 15px;
  color: ${theme.colors.text};
  line-height: 2;
  margin-top: 20px;
`;

export default Section2;

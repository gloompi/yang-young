import React from 'react';
import { css } from '@emotion/core';
import { GiFactory, GiTrophyCup } from 'react-icons/gi';
import { FaPlaneDeparture } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import useTheme, { ITheme } from 'hooks/use-theme';
import Section from 'components/common/section';
import Dots from 'components/common/dots';

const Section2 = () => {
  const { t } = useTranslation('home');
  const theme = useTheme();

  return (
    <Section
      title={t('why.title')}
      description={t('why.description')}
      contentStyles={contentStyles(theme)}
    >
      <ul css={listStyles}>
        <li css={itemStyles}>
          <span css={iconWrapper(theme)}>
            <GiFactory css={iconStyles(theme)} />
          </span>
          <h3 css={titleStyles(theme)}>FAST DELIVERY</h3>
          <Dots />
          <div css={descrStyles(theme)}>Buy directly from the factory</div>
        </li>
        <li css={itemStyles}>
          <span css={iconWrapper(theme)}>
            <FaPlaneDeparture css={iconStyles(theme)} />
          </span>
          <h3 css={titleStyles(theme)}>1-YEAR WARRANTY</h3>
          <Dots />
          <div css={descrStyles(theme)}>Fast international delivery</div>
        </li>
        <li css={itemStyles}>
          <span css={iconWrapper(theme)}>
            <GiTrophyCup css={iconStyles(theme)} />
          </span>
          <h3 css={titleStyles(theme)}>PRIZE-WINNING DESIGNS</h3>
          <Dots />
          <div css={descrStyles(theme)}>Design and quality awards</div>
        </li>
      </ul>
    </Section>
  );
};

const contentStyles = (theme: ITheme) => css`
  padding: 0 ${theme.containerRange()} 120px;
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

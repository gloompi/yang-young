import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';

import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import Loader from 'components/common/loader';
import Slider from 'components/common/slider';
import Slide from 'components/home/slide';

const Section1: FC = observer(() => {
  const theme = useTheme();
  const { appStore, slidesStore } = useStore();
  const { title, titleCN, description, descriptionCN } = slidesStore.staticText;

  const isDesktop = useMediaQuery({ maxWidth: 1200 });
  const isTablet = useMediaQuery({ maxWidth: 768 });

  const currentTitle = appStore.lang === 'en' ? title : titleCN;
  const currentDescription =
    appStore.lang === 'en' ? description : descriptionCN;

  useEffect(() => {
    slidesStore.fetchStaticText();
    slidesStore.fetchSlides();
  }, []);

  console.log('CHECK', title, titleCN, description, descriptionCN);

  return (
    <section css={sectionStyle}>
      {slidesStore.loading ? (
        <Loader />
      ) : (
        <>
          <ul css={slidesStyle}>
            <Slider slides={slidesStore.slides} SlideElement={Slide} />
          </ul>
          <div css={staticWrapper}>
            <h1 css={titleStyles(theme, isDesktop, isTablet)}>
              {currentTitle}
            </h1>
            <p css={descriptionStyles(theme, isDesktop, isTablet)}>
              {currentDescription}
            </p>
          </div>
        </>
      )}
    </section>
  );
});

const sectionStyle = css`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 100vh;
`;

const slidesStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0;
`;

const staticWrapper = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
`;

const titleStyles = (
  theme: ITheme,
  isDesktop: boolean,
  isTablet: boolean
) => css`
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

  ${isDesktop &&
    `
      font-size: 50px;
      letter-spacing: 7px;
      margin-bottom: 35px;
    `},
  ${isTablet &&
    `
      font-size: 40px;
      letter-spacing: 3px;
      margin-bottom: 25px;
    `},
`;

const descriptionStyles = (
  theme: ITheme,
  isDesktop: boolean,
  isTablet: boolean
) => css`
  white-space: nowrap;
  line-height: 29px;
  font-family: Hind, sans-serif;
  font-size: 45px;
  color: ${theme.colors.white};
  text-align: center;
  margin: 0;
  padding: 0;

  ${isDesktop &&
    `
      font-size: 35px;
    `},
  ${isTablet &&
    `
      font-size: 25px;
    `},
`;

export default Section1;

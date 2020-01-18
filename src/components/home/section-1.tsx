import React, { FC } from 'react';
import { css } from '@emotion/core';

import useSlides from 'hooks/use-slides';
import Slider from 'components/common/slider';
import Slide from 'components/home/slide';

const Section1: FC = () => {
  const slides = useSlides();

  return (
    <section css={sectionStyle}>
      <ul css={slidesStyle}>
        <Slider slides={slides} SlideElement={Slide} />
      </ul>
    </section>
  );
};

const sectionStyle = css`
  width: 100%;
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

export default Section1;

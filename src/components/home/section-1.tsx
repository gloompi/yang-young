import React, { FC, useEffect } from 'react';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import Loader from 'components/common/loader';
import Slider from 'components/common/slider';
import Slide from 'components/home/slide';

const Section1: FC = observer(() => {
  const { slidesStore } = useStore();

  useEffect(() => {
    slidesStore.fetchSlides();
  }, []);

  return (
    <section css={sectionStyle}>
      {slidesStore.loading ? (
        <Loader />
      ) : (
        <ul css={slidesStyle}>
          <Slider slides={slidesStore.slides} SlideElement={Slide} />
        </ul>
      )}
    </section>
  );
});

const sectionStyle = css`
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

export default Section1;

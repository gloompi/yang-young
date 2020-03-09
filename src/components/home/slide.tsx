import React, { FC } from 'react';
import { css } from '@emotion/core';

import env from 'config/env';
import { IExtendedSlide } from 'stores/slidesStore';

interface IProps {
  slide: IExtendedSlide;
}

const Slide: FC<IProps> = ({ slide }) => <div css={bgStyles(slide.coverImg)} />;

const bgStyles = (coverImg: string) => css`
  position: relative;
  width: 100%;
  height: 100%;
  background: url(${env.mediaUrl}/${coverImg}) no-repeat center;
  background-size: cover;

  * {
    position: relative;
  }
`;

export default Slide;

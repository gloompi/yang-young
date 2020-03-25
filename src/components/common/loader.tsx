import React from 'react';
import { css } from '@emotion/core';

export default () => (
  <div css={loaderWrapperCss}>
    <img css={imgCss} src={require('assets/images/loading.gif')} />
  </div>
);

const loaderWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #000;
`;

const imgCss = css`
  width: 100%;
`;

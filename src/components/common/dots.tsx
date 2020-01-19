import React, { FC } from 'react';
import { css } from '@emotion/core';

import useTheme, { ITheme } from 'hooks/use-theme';

const Dots: FC = () => {
  const theme = useTheme();

  return (
    <div css={dotsStyles(theme)}>
      <span />
    </div>
  );
};

const dotsStyles = (theme: ITheme) => css`
  position: relative;
  width: 50px;
  height: 1px;
  margin-top: 10px;
  background-color: ${theme.colors.primary};

  &:after,
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    width: 5px;
    height: 5px;
    background-color: ${theme.colors.primary};
    border-radius: 50%;
  }

  &:after {
    left: 50%;
    transform: translate(100%, -55%);
  }

  &:before {
    right: 50%;
    transform: translate(-100%, -55%);
  }

  span {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background-color: ${theme.colors.primary};
    border-radius: 50%;
    transform: translate(-50%, -55%);
  }
`;

export default Dots;

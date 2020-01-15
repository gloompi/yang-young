import React, { FC, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { animated, useSpring } from 'react-spring';
import { css } from '@emotion/core';

interface IProps {
  topOffset: number;
}

const Sticky: FC<IProps> = ({ children, topOffset }) => {
  const [active, setActive] = useState(false);
  const relativeStyles = useSpring({ opacity: active ? 0 : 1 });
  const fixedStyles = useSpring({ opacity: active ? 1 : 0, top: topOffset, height: active ? 'auto' : 0 });

  const handleEnter = () => {
    setActive(false);
  };

  const handleLeave = () => {
    setActive(true);
  };

  return (
    <Waypoint topOffset={topOffset} onEnter={handleEnter} onLeave={handleLeave}>
      <div>
        <animated.div css={relativeCss} style={relativeStyles}>
          {children}
        </animated.div>
        <animated.div css={fixedCss} style={fixedStyles}>
          {children}
        </animated.div>
      </div>
    </Waypoint>
  );
};

const relativeCss = css`
  position: relative;
  width: 100%;
`;

const fixedCss = css`
  position: fixed;
  width: 100%;
  left: 0;
  overflow: hidden;
  z-index: 1000;
`;

export default Sticky;

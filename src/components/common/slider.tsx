import React, { useState, MouseEventHandler, FunctionComponent } from 'react';
import { css } from '@emotion/core';
import { useSprings, animated } from 'react-spring';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';

import useTheme, { ITheme } from 'hooks/use-theme';
import { IPrettySlide } from 'hooks/use-slides';

interface IArguments {
  slide: IPrettySlide;
}

interface IProps {
  slides: IPrettySlide[];
  SlideElement: FunctionComponent<IArguments>;
}

const Slider = ({ slides, SlideElement }: IProps) => {
  const theme = useTheme();
  const [activeSlide, setActiveSlide] = useState(slides[0]);

  const springs = useSprings(
    slides.length,
    slides.map(slide => ({
      opacity: activeSlide.slug === slide.slug ? 1 : 0,
      transform: activeSlide.slug === slide.slug ? 0 : 50,
      left:
        activeSlide.slug === slide.slug
          ? 0
          : activeSlide.slug > slide.slug
          ? -100
          : 100,
    }))
  );

  const handleClick = (
    slide: IPrettySlide
  ): MouseEventHandler<HTMLElement> => () => {
    setActiveSlide(slide);
  };

  const handleNextClick = () => {
    setActiveSlide(activeSlide.next || slides[0]);
  };

  const handlePrevClick = () => {
    setActiveSlide(activeSlide.prev || slides[slides.length - 1]);
  };

  return (
    <>
      {springs.map(({ opacity, left, transform }, idx) => {
        const slide = slides[idx];
        const isSlideActive = slide.slug === activeSlide.slug;

        return (
          <animated.li
            key={slide.slug}
            style={{
              // @ts-ignore
              left: left.interpolate(x => `${x}%`),
              zIndex: isSlideActive ? 100 : 0,
              // @ts-ignore
              transform: transform.interpolate(
                (x: number) => `perspective(500px) translateZ(${x}px)`
              ),
              opacity,
            }}
            css={itemStyles}
          >
            <SlideElement slide={slide} />
          </animated.li>
        );
      })}

      <div css={arrowsWrapperStyles}>
        <span css={arrowStyles} onClick={handlePrevClick}>
          <TiChevronLeftOutline />
        </span>
        <span css={arrowStyles} onClick={handleNextClick}>
          <TiChevronRightOutline />
        </span>
      </div>

      <div css={dotsWrapperStyles}>
        {slides.map(slide => (
          <span
            key={slide.slug}
            className={activeSlide.slug === slide.slug ? 'active' : ''}
            css={dotStyles(theme)}
            onClick={handleClick(slide)}
          />
        ))}
      </div>
    </>
  );
};

const itemStyles = css`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;

const arrowsWrapperStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  top: 50%;
  width: 100%;
  padding: 0 25px;
  transform: translateY(-50%);
  z-index: 101;
`;

const arrowStyles = css`
  font-size: 35px;
  color: #fff;
  cursor: pointer;
`;

const dotsWrapperStyles = css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  z-index: 102;
`;

const dotStyles = (theme: ITheme) => css`
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: ${theme.colors.white};
  overflow: hidden;
  cursor: pointer;

  &:last-item {
    margin-right: 0;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.primary};
    transition: 0.3s;
  }

  &.active {
    &:after {
      top: 0;
    }
  }
`;

export default Slider;

import React, {
  useState,
  useEffect,
  MouseEventHandler,
  FunctionComponent,
} from 'react';
import { css } from '@emotion/core';

import { closureThrottle } from 'utils/throttle';
import { useSprings, animated } from 'react-spring';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';

import useTheme, { ITheme } from 'hooks/use-theme';
import { IExtendedSlide } from 'stores/slidesStore';

interface IArguments {
  slide: IExtendedSlide;
}

interface IProps {
  slides: IExtendedSlide[];
  SlideElement: FunctionComponent<IArguments>;
}

const throttle = closureThrottle(500);

const Slider = ({ slides, SlideElement }: IProps) => {
  const theme = useTheme();
  const [activeSlide, setActiveSlide] = useState(slides[0]);

  const springs = useSprings(
    slides.length,
    slides.map(slide => ({
      opacity: activeSlide.id === slide.id ? 1 : 0,
      transform: activeSlide.id === slide.id ? 0 : 40,
      left: activeSlide.id === slide.id ? 0 : -10,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(activeSlide.next || slides[0]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [activeSlide]);

  const handleClick = (
    slide: IExtendedSlide
  ): MouseEventHandler<HTMLElement> => () =>
    throttle(() => setActiveSlide(slide));

  const handleNextClick = () => {
    throttle(() => setActiveSlide(activeSlide.next || slides[0]));
  };

  const handlePrevClick = () => {
    throttle(() => {
      setActiveSlide(activeSlide.prev || slides[slides.length - 1]);
    });
  };

  return (
    <>
      {springs.map(({ opacity, left, transform }, idx) => {
        const slide = slides[idx];
        const isSlideActive = slide.id === activeSlide.id;

        return (
          <animated.li
            key={slide.id}
            style={{
              // @ts-ignore
              left: left.interpolate(x => `${x}%`),
              zIndex: isSlideActive ? 100 : 0,
              // @ts-ignore
              transform: transform.interpolate(
                (x: number) => `perspective(500px) translateY(${x}px)`
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
            key={slide.id}
            className={activeSlide.id === slide.id ? 'active' : ''}
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

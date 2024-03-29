import React, {
  FC,
  useRef,
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
  KeyboardEventHandler,
} from 'react';
import { Link, navigate } from 'gatsby';
import { css } from '@emotion/core';
import Image from 'gatsby-image';
import throttle from 'lodash/throttle';
import useTheme, { ITheme } from 'hooks/use-theme';
import { useMediaQuery } from 'react-responsive';
import { observer } from 'mobx-react-lite';
import { Waypoint } from 'react-waypoint';
import { FaShoppingBag } from 'react-icons/fa';
import { IoMdHeart, IoIosMenu, IoIosSearch } from 'react-icons/io';

import useLogo from 'hooks/use-logo';
import useStore from 'hooks/use-store';
import useOutsideClick from 'hooks/use-click-outside';
import SideBar from 'components/common/sideBar';
import SideBarList from 'components/common/sideBar/sidebarList';
import HeaderMnu from './headerMnu';

export type TSideBar = null | 'basket' | 'favourite' | 'menu';

const Header: FC = observer(() => {
  const [active, setActive] = useState(false);
  const [sideBarType, setSideBarType] = useState<TSideBar>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const data = useLogo();
  const theme = useTheme();
  const isPhone = useMediaQuery({ maxWidth: 480 });
  const isTablet = useMediaQuery({ maxWidth: 768 });
  const { appStore, basketStore, favouriteStore, searchStore } = useStore();
  const headerRef = useRef<HTMLHeadElement>(null);
  const sideBarRef = useRef<HTMLDivElement>(null);

  const search = throttle(searchStore.handleSearch, 1000);

  const handleEnter = () => {
    setActive(false);
  };

  const handleLeave = () => {
    setActive(true);
  };

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    appStore.setLang(e.target.value);
  };

  const handeSearchClick = () => {
    setSearchOpen(open => !open);
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async e => {
    if (e.key === 'Enter') {
      await search();
      setSearchOpen(false);
      navigate('/search');
    }
  };

  const getButtons = useMemo(
    () => (
      <div style={{ position: 'relative' }}>
        {searchOpen && (
          <input
            css={searchInputCss}
            type="text"
            placeholder="what you want to find?"
            value={searchStore.searchString}
            onChange={e => searchStore.changeSearchString(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        )}
        <select
          css={langSelect(theme)}
          onChange={handleSelect}
          value={appStore.lang}
        >
          <option value="en">EN</option>
          <option value="cn">中文</option>
        </select>
        <button css={iconButton(theme)} onClick={handeSearchClick}>
          <IoIosSearch />
        </button>
        <button
          css={iconButton(theme)}
          onClick={() => setSideBarType('favourite')}
        >
          {favouriteStore.length > 0 && (
            <span css={iconPopup(theme)}>{favouriteStore.length}</span>
          )}
          <IoMdHeart />
        </button>
        <button
          css={iconButton(theme)}
          onClick={() => setSideBarType('basket')}
        >
          {basketStore.length > 0 && (
            <span css={iconPopup(theme)}>{basketStore.length}</span>
          )}
          <FaShoppingBag />
        </button>
      </div>
    ),
    [
      searchStore.searchString,
      favouriteStore.length,
      basketStore.length,
      appStore.lang,
      searchOpen,
    ]
  );

  useOutsideClick({
    node: sideBarRef,
    handleClickOutside: () => setSideBarType(null),
  });

  useEffect(() => {
    if (headerRef.current !== null) {
      appStore.setHeaderHeight(headerRef.current.offsetHeight);
    }
  });

  return (
    <div>
      <Waypoint bottomOffset={77} onEnter={handleEnter} onLeave={handleLeave} />
      <SideBar
        sideBarRef={sideBarRef}
        type={sideBarType}
        handleClose={() => setSideBarType(null)}
      >
        <SideBarList type={sideBarType} />
        {isPhone && getButtons}
        {isTablet && <HeaderMnu active={active}/>}
      </SideBar>
      <header
        className={active ? 'active' : ''}
        css={headerStyle(theme)}
        ref={headerRef}
      >
        <Link to="/" css={logoCss}>
          {active ? (
            <Image fluid={data.image.fluid} style={{ width: 200 }} />
          ) : (
            <Image fluid={data.whiteImage.fluid} style={{ width: 200 }} />
          )}
        </Link>
        {!isTablet && <HeaderMnu active={active} />}
        <div css={headerTopList}>
          {/* <button css={iconButton(theme)}>
            <IoMdHelpCircleOutline />
          </button> */}
          {!isPhone && getButtons}
          {isTablet && (
            <button
              css={iconButton(theme)}
              onClick={() => setSideBarType('menu')}
            >
              <IoIosMenu />
            </button>
          )}
        </div>
      </header>
    </div>
  );
});

const headerStyle = (theme: ITheme) => css`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 96px;
  padding: 0 32px;
  color: ${theme.colors.white};
  background: linear-gradient(
    rgba(32, 32, 32, 0.5) 0%,
    rgba(32, 32, 32, 0) 100%
  );
  transition: 0.3s;
  z-index: 1000;

  &.active {
    min-height: 50px;
    background: linear-gradient(90deg, rgba(50, 50, 50) 0%, rgb(0, 0, 0) 100%);
  }
`;

const logoCss = css`
  display: flex;
  align-items: center;
  color: inherit;
  margin: 0;

  h1 {
    color: inherit;
  }
`;

const headerTopList = css`
  display: flex;
  align-items: center;
`;

const searchInputCss = css`
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  max-width: 250px;
  height: 35px;
  border: none;
  border-radius: 5px;
  padding: 15px;
  margin-top: 25px;
  box-shadow: -3px 3px 5px 0px rgba(0, 0, 0, 0.75);
`;

const langSelect = (theme: ITheme) => css`
  position: relative;
  font-size: 14px;
  margin-right: 25px;
  color: #000;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const iconButton = (theme: ITheme) => css`
  position: relative;
  font-size: 22px;
  margin-right: 25px;
  color: inherit;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:last-child {
    margin-right: 0;
  }
`;

const iconPopup = (theme: ITheme) => css`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  top: 100%;
  left: 100%;
  width: 20px;
  height: 20px;
  color: ${theme.colors.white};
  background-color: ${theme.colors.red};
  border-radius: 50px;
  transform: translate(-50%, -80%);
`;

export default Header;

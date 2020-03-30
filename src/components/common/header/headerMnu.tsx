import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import useHeaderMnu from 'hooks/use-header-mnu';
import useTheme, { ITheme } from 'hooks/use-theme';

interface IProps {
  active: boolean;
}

const HeaderMnu: FC<IProps> = observer(({ active }) => {
  const { appStore } = useStore();
  const headerMnu = useHeaderMnu();
  const theme = useTheme();

  return (
    <>
      <ul css={headerBottomList(theme)}>
        {headerMnu.map(category => (
          <li key={category.id} css={headerItems(theme)}>
            <Link to={`/category/${category.name}`}>
              {appStore.lang === 'en' ? category.title : category.titleCN}
            </Link>
            {category.subcategory.length > 0 && (
              <div className="submenu" css={subcategoryWrapperCss(active)}>
                {category.subcategory.map(subcategory => (
                  <Link
                    key={subcategory.id}
                    css={subcategoryCss}
                    to={`/subcategory/${subcategory.name}`}
                  >
                    {appStore.lang === 'en'
                      ? subcategory.title
                      : subcategory.titleCN}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
});

const headerBottomList = (theme: ITheme) => css`
  display: flex;
  align-items: flex-start;

  ${theme.applyMediaStyles({
    isTablet: `
      flex-direction: column;
      padding-top: 50px;
    `,
  })}
`;

const headerItems = (theme: ITheme) => css`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-right: 32px;

  &:hover {
    button {
      color: ${theme.colors.primary};
    }

    .submenu {
      left: -25px;
      opacity: 1;
    }
  }

  ${theme.applyMediaStyles({
    isTablet: `
      margin-bottom: 25px;
    `,
  })}

  &:last-child {
    margin-right: 0;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 39px;
  }

  a {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: inherit;
    text-transform: uppercase;
  }
`;

const subcategoryWrapperCss = (active: boolean) => css`
  position: absolute;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  left: -9999px;
  top: 100%;
  min-width: 100%;
  margin-top: ${active ? '16' : '39'}px;
  padding: 25px;
  opacity: 0;
  background-color: rgba(35, 35, 35, ${active ? '1' : '0.3'});
  transition: 0.3s opacity;
`;

const subcategoryCss = css`
  white-space: nowrap;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default HeaderMnu;

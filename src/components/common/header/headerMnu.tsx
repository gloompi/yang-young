import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';

import useStore from 'hooks/use-store';
import useHeaderMnu from 'hooks/use-header-mnu';
import useTheme, { ITheme } from 'hooks/use-theme';

const HeaderMnu: FC = observer(() => {
  const { appStore } = useStore();
  const headerMnu = useHeaderMnu();
  const theme = useTheme();
  const isTablet = useMediaQuery({ maxWidth: 768 });

  if (isTablet) {
    return null;
  }

  return (
    <>
      <ul css={headerBottomList}>
        {headerMnu.map(category => (
          <li key={category.id} css={headerItems(theme)}>
            <Link to={`/${category.name}`}>
              {appStore.lang === 'en' ? category.title : category.titleCN}
            </Link>
          </li>
        ))}
        <li css={headerItems(theme)}>
          <Link to="/story">our stories</Link>
        </li>
      </ul>
    </>
  );
});

const headerBottomList = css`
  display: flex;
  align-items: flex-start;
`;

const headerItems = (theme: ITheme) => css`
  display: flex;
  align-items: flex-start;
  margin-right: 32px;

  &:hover {
    button {
      color: ${theme.colors.primary};
    }
  }

  &:last-child {
    margin-right: 0;
  }

  a {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: inherit;
    text-transform: uppercase;
  }
`;

export default HeaderMnu;

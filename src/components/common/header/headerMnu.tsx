import React, { FC } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { observer } from 'mobx-react-lite';

import useStore from 'hooks/use-store';
import useHeaderMnu from 'hooks/use-header-mnu';
import useTheme, { ITheme } from 'hooks/use-theme';

const HeaderMnu: FC = observer(() => {
  const { appStore } = useStore();
  const headerMnu = useHeaderMnu();
  const theme = useTheme();

  return (
    <>
      <ul css={headerBottomList(theme)}>
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
  display: flex;
  align-items: flex-start;
  margin-right: 32px;

  &:hover {
    button {
      color: ${theme.colors.primary};
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

  a {
    font-family: Avenir-Bold;
    font-size: 12px;
    color: inherit;
    text-transform: uppercase;
  }
`;

export default HeaderMnu;

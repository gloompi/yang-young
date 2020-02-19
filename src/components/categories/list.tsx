import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { css } from '@emotion/core';

import useTheme, { ITheme } from 'hooks/use-theme';
import useStore from 'hooks/use-store';
import useColors from 'hooks/use-colors';
import useDevices from 'hooks/use-devices';
import Loader from 'components/common/loader';
import ProductsList from 'components/common/productsList';

interface IProps {
  categoryId: string;
}

const List: FC<IProps> = observer(({ categoryId }) => {
  const { productsStore } = useStore();
  const theme = useTheme();
  const colors = useColors();
  const devices = useDevices();

  const handleFilterByColor = (colorId: string) => () => {
    productsStore.fetchProducts({
      category: categoryId,
      color: colorId,
    });
  };

  const handleFilterByDevice = (deviceId: string) => () => {
    productsStore.fetchProducts({
      category: categoryId,
      device: deviceId,
    });
  };

  return (
    <div css={wrapperCss}>
      <aside css={sideNavCss(theme)}>
        <h3 css={filterTitleCss}>Filter by</h3>
        <h4 css={filterSubtitleCss}>Device:</h4>
        <ul css={filterList}>
          {devices.map(device => (
            <li
              key={device.id}
              css={filterItem(theme)}
              onClick={handleFilterByDevice(device.id)}
            >
              - {device.name}
            </li>
          ))}
        </ul>
        <h4 css={filterSubtitleCss}>Color:</h4>
        <ul css={filterList}>
          {colors.map(color => (
            <li
              key={color.id}
              css={filterItem(theme)}
              onClick={handleFilterByColor(color.id)}
            >
              - {color.name}
            </li>
          ))}
        </ul>
      </aside>
      {productsStore.loading ? (
        <Loader />
      ) : (
        <>
          <ProductsList path="cases" products={productsStore.products} />
        </>
      )}
    </div>
  );
});

const wrapperCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
`;

const sideNavCss = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 300px;
  margin-right: 50px;
  border-right: 1px solid ${theme.colors.yellow};
`;

const filterTitleCss = css`
  font-size: 20px;
  margin-bottom: 25px;
`;

const filterSubtitleCss = css`
  font-size: 16px;
  margin-bottom: 10px;
`;

const filterList = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-left: 15px;
  margin-bottom: 15px;
`;

const filterItem = (theme: ITheme) => css`
  padding-left: 15px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.yellow};
  }
`;

export default List;

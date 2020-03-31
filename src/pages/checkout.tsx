import React, { FC, useState, MouseEvent } from 'react';
import { css } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

import { IProduct } from 'types/common';
import useStore from 'hooks/use-store';
import useTheme, { ITheme } from 'hooks/use-theme';
import SideBarItem from 'components/common/sideBar/sidebarItem';
import Loader from 'components/common/loader';
import Layout from 'components/common/layout';

const countriesEnum = Object.freeze({
  USA: 'USA',
  CHINA: 'CHINA',
});

const Checkout: FC = observer(() => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: countriesEnum.USA,
    zip: '',
    phone: '',
    email: '',
  });
  const { t } = useTranslation('common');
  const { checkoutStore, basketStore } = useStore();
  const theme = useTheme();

  const handleStateChange = (key: string, value: string | number) => {
    setState(currentState => ({ ...currentState, [key]: value }));
  };

  const handleCheckoutClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (Object.values(state).includes('')) {
      return null;
    }

    e.preventDefault();

    checkoutStore.handleCheckout();
  };

  return (
    <Layout>
      <div css={wrapperCss(theme)}>
        <h1 css={titleCss}>
          {t('checkout.title')} ({basketStore.length})
        </h1>
        {checkoutStore.loading ? (
          <Loader />
        ) : (
          <>
            <ul css={itemsCss}>
              {(Array.from(basketStore.items) as Array<[string, IProduct]>).map(
                ([key, product]) => (
                  <SideBarItem key={key} product={product} big={true} />
                )
              )}
            </ul>
            <div css={checkoutWrapperCss}>
              <div css={productsCss(theme)}>
                <span>Products</span>
                <span>{basketStore.aggregatedPrice} USD</span>
              </div>
              <div css={productsCss(theme)} style={{ borderBottom: 'none' }}>
                <span>Shipping</span>
                <span>${basketStore.shipping} USD</span>
              </div>
              <div css={totalCss(theme)}>
                <span>Total</span>
                <span>{basketStore.totalPrice} USD</span>
              </div>
            </div>
          </>
        )}
        <h2 css={secondTitle}>{t('checkout.shipping_title')}</h2>
        <form css={formCss}>
          <label css={labelCss(theme)}>
            <span>First Name</span>
            <input
              value={state.firstName}
              type="text"
              required={true}
              onChange={e => handleStateChange('firstName', e.target.value)}
              disabled={checkoutStore.loading}
            />
          </label>
          <label css={labelCss(theme)}>
            <span>Last Name</span>
            <input
              value={state.lastName}
              type="text"
              required={true}
              onChange={e => handleStateChange('lastName', e.target.value)}
              disabled={checkoutStore.loading}
            />
          </label>
          <label css={labelCss(theme)}>
            <span>Address (Street, City, State)</span>
            <input
              value={state.address}
              type="text"
              required={true}
              onChange={e => handleStateChange('address', e.target.value)}
              disabled={checkoutStore.loading}
            />
          </label>
          <label css={labelCss(theme)}>
            <span>Country</span>
            <select
              value={state.country}
              required={true}
              onChange={e => handleStateChange('country', e.target.value)}
              disabled={checkoutStore.loading}
            >
              <option>{countriesEnum.USA}</option>
              <option>{countriesEnum.CHINA}</option>
            </select>
          </label>
          <label css={labelCss(theme)}>
            <span>ZIP code</span>
            <input
              value={state.zip}
              type="number"
              required={true}
              onChange={e => handleStateChange('zip', e.target.value)}
              disabled={checkoutStore.loading}
            />
          </label>
          <label css={labelCss(theme)}>
            <span>Phone number</span>
            <input
              value={state.phone}
              type="phone"
              required={true}
              onChange={e => handleStateChange('phone', e.target.value)}
              disabled={checkoutStore.loading}
            />
          </label>
          <label css={labelCss(theme)}>
            <span>Email</span>
            <input
              value={state.email}
              type="email"
              required={true}
              onChange={e => handleStateChange('email', e.target.value)}
              disabled={checkoutStore.loading}
            />
          </label>
          <button
            css={paymentBtnCss(theme, checkoutStore.loading)}
            onClick={handleCheckoutClick}
            disabled={checkoutStore.loading}
          >
            {t('checkout.payment')}
          </button>
        </form>
      </div>
    </Layout>
  );
});

const wrapperCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 125px ${theme.containerRange()};
`;

const titleCss = css`
  font-size: 25px;
  width: 100%;
  margin-bottom: 25px;
  text-transform: uppercase;
  text-align: center;
`;

const secondTitle = css`
  font-size: 20px;
  width: 100%;
  margin-bottom: 25px;
  text-transform: uppercase;
  text-align: center;
`;

const itemsCss = css`
  width: 100%;
`;

const checkoutWrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  margin-bottom: 50px;
  background-color: #fff;
`;

const productsCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding 15px 0;
  border-bottom: 1px solid ${theme.colors.red};

  span {
    ${theme.fontFamily('Oswald')};
    font-size: 14px;
  }
`;

const totalCss = (theme: ITheme) => css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 25px;

  span {
    ${theme.fontFamily('Oswald')};
    font-size: 20px;
  }
`;

const formCss = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const labelCss = (theme: ITheme) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 49%;

  input,
  select {
    ${theme.fontFamily('MontSerrat')};
    font-size: 18px;
    height: 45px;
    width: 100%;
    padding-left: 15px;
  }

  span {
    font-size: 14px;
    margin-top: 25px;
  }
`;

const paymentBtnCss = (theme: ITheme, disabled: boolean) => css`
  ${theme.fontFamily('Oswald')};
  font-size: 25px;
  width: 100%;
  padding: 15px;
  margin-top: 50px;
  color: ${theme.colors.white};
  background-color: ${disabled ? theme.colors.grey : theme.colors.black};
  text-transform: uppercase;
  cursor: ${disabled ? 'progress' : 'pointer'}
  transition: 0.3s;

  &:hover {
    background-color: ${disabled ? theme.colors.grey : theme.colors.primary};
  }
`;

export default Checkout;

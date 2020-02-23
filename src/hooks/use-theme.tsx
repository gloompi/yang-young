import React, { FC, useContext, createContext } from 'react';
import { css, SerializedStyles } from '@emotion/core';

export interface ITheme {
  colors: Theme['colors'];
  container: SerializedStyles;
  containerRange: (val?: number) => string;
  fontFamily: (font: TFont) => string;
}

type TFont =
  | 'MontSerrat'
  | 'MontSerrat-Medium'
  | 'MontSerrat-Bold'
  | 'MontSerrat-Black'
  | 'Avenir'
  | 'Avenir-Bold'
  | 'Oswald';

class Theme implements ITheme {
  private static _instance: Theme | null = null;

  public colors = {
    yellow: '#f4bd26',
    primary: '#f4bd26',
    secondary: '#f4bd26',
    text: '#202020',
    white: '#fff',
    red: '#FB024A',
    grey: '#E5E5E5',
    black: '#141414',
    lightBlack: '#1a1a1a',
  };

  public container = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 calc((100vw - 1170px) / 2);
  `;

  public containerRange = (val = 0) => `calc((100vw - ${1170 + val}px) / 2)`;

  public fontFamily = (font: TFont): string => {
    return `font-family: ${font}`;
  };

  static get instance(): Theme {
    if (this._instance === null) {
      this._instance = new Theme();
    }

    return this._instance;
  }
}

export const themeInstance = Theme.instance;

const ThemeContext = createContext<Theme>(themeInstance);

export const ThemeProvider: FC = ({ children }) => (
  <ThemeContext.Provider value={themeInstance}>
    {children}
  </ThemeContext.Provider>
);

export default () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error(
      'Please, make sure that `ThemeProvider` specified higher in the tree'
    );
  }

  return theme;
};

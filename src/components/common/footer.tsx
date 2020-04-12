import React, { FC, useState } from 'react';
import { css } from '@emotion/core';
import { Link } from 'gatsby';

import useStore from 'hooks/use-store';
import useTemplatePages from 'hooks/use-template-pages';
import useSocials from 'hooks/use-socials';
import useTheme, { ITheme } from 'hooks/use-theme';

const Footer: FC = () => {
  const [active, setActive] = useState(false);
  const { appStore } = useStore();
  const theme = useTheme();
  const socials = useSocials();
  const templateCategories = useTemplatePages();

  const toggleActive = () => {
    setActive(isActive => !isActive);
  };

  return (
    <footer css={footerStyle}>
      <div css={containerStyle}>
        <div css={templatePagesCss}>
          {templateCategories
            .filter(category => category.id)
            .map(category => (
              <div key={category.id} css={categoryItemCss}>
                <button
                  css={categoryBtnCss(theme, active)}
                  onClick={toggleActive}
                >
                  {appStore.lang === 'en' ? category.name : category.nameCN}
                </button>
                <ul css={templatesListCss(active)}>
                  {category.templates.map(template => (
                    <Link
                      key={template.id}
                      css={templateLinkCss(theme)}
                      to={`/${template.title}`}
                    >
                      {appStore.lang === 'cn' && template.titleCN
                        ? template.titleCN
                        : template.title}
                    </Link>
                  ))}
                </ul>
              </div>
            ))}
        </div>
        <span>&copy; {new Date().getFullYear()} Yang Young</span>
        <ul css={socialsListCss}>
          {socials.map(({ faIcon, link }) => {
            const Icon = require('react-icons/fa')[faIcon];

            return (
              <a
                key={link}
                css={socialLinkCss(theme)}
                href={link}
                target="_blank"
              >
                <Icon />
              </a>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

const footerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  color: #fff;
  background: #000;
`;

const containerStyle = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 25px calc((100vw - 1200px) / 2);
  margin: 0 25px;
`;

const templatePagesCss = css`
  display: flex;
  align-items: flex-start;
  height: 100%;
  margin-right: 50px;
`;

const categoryItemCss = css`
  margin-right: 25px;

  &:last-child {
    margin-right: 0;
  }
`;

const categoryBtnCss = (theme: ITheme, active: boolean) => css`
  ${theme.fontFamily('Oswald')};
  font-size: 20px;
  color: ${theme.colors.white};
  border-bottom: ${active ? `1px solid ${theme.colors.white}` : 'none'};
  padding-bottom: ${active ? 7 : 0}px;
  margin-bottom: ${active ? 7 : 0}px;
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const templatesListCss = (active: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: ${active ? 'auto' : 0};
  opacity: ${active ? 1 : 0};
  overflow: hidden;
  transition: 0.3s opacity;
`;

const templateLinkCss = (theme: ITheme) => css`
  font-size: 16px;
  color: ${theme.colors.white};
  margin-right: 15px;
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.primary};
  }

  &:last-child {
    margin-right: 0;
  }
`;

const socialsListCss = css`
  display: flex;
  align-items: center;
`;

const socialLinkCss = (theme: ITheme) => css`
  font-size: 20px;
  color: ${theme.colors.white};
  margin-right: 10px;
  transition: 0.3s;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${theme.colors.primary};
  }
`;

export default Footer;

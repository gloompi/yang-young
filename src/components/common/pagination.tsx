import React, { FC } from 'react';
import { css } from '@emotion/core';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import useTheme, { ITheme } from 'hooks/use-theme';

interface IProps {
  page: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
  handlePageChange: (page: number) => void;
}

const Pagination: FC<IProps> = ({
  page,
  pages,
  hasNext,
  hasPrev,
  handlePageChange,
}) => {
  const theme = useTheme();
  const pagesArray = [...Array(pages).keys()];

  const handlePrevClick = () => {
    if (hasPrev) {
      handlePageChange(page - 1);
    }
  };

  const handleNextClick = () => {
    if (hasNext) {
      handlePageChange(page + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => () => {
    handlePageChange(pageNumber);
  };

  return (
    <div css={paginationWrapperCss}>
      {hasPrev && (
        <button css={arrowBtnCss(theme)} onClick={handlePrevClick}>
          <MdNavigateBefore />
        </button>
      )}
      {pagesArray.map(pageNumber => {
        const actualPageNumber = pageNumber + 1;

        return (
          <button
            key={pageNumber}
            className={page === actualPageNumber ? 'active' : ''}
            css={pageBtnCss(theme)}
            onClick={handlePageClick(actualPageNumber)}
          >
            {actualPageNumber}
          </button>
        );
      })}
      {hasNext && (
        <button css={arrowBtnCss(theme)} onClick={handleNextClick}>
          <MdNavigateNext />
        </button>
      )}
    </div>
  );
};

const paginationWrapperCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 25px 50px;

  button {
    font-size: 18px;
  }
`;

const pageBtnCss = (theme: ITheme) => css`
  color: ${theme.colors.black};
  border: 1px solid ${theme.colors.black};
  border-radius: 5px;
  padding: 12px 15px;
  margin: 0 7px;
  transition: 0.3s;

  &.active,
  &:hover {
    color: ${theme.colors.white};
    background-color: ${theme.colors.primary};
    border: 1px solid transparent;
  }
`;

const arrowBtnCss = (theme: ITheme) => css`
  color: ${theme.colors.black};
  padding: 10px;
  transition: 0.3s;

  &:hover {
    color: ${theme.colors.primary};
  }

  svg {
    font-size: 25px;
    margin-bottom: -5px;
  }
`;

export default Pagination;

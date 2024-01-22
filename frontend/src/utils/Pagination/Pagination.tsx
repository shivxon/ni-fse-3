import React, { useCallback, useMemo } from "react";
import styles from "./Pagination.module.css";
import Button from 'react-bootstrap/Button';

type PAGINATION_PROPS = {
  page?: number;
  setPage?: (page: number) => void;
  totalPages?: number;
};

const PaginationControl = (props: PAGINATION_PROPS) => {
  const { page = 1, setPage = () => { }, totalPages = 1 } = props;

  const [firstPage, ...remainingPages] =
    useMemo(
      () => Array.from({ length: totalPages }, (_, i) => i + 1),
      [totalPages]
    ) ?? [];

  const lastPage = remainingPages[remainingPages?.length - 1];

  const handlePageClick = useCallback(
    (_page: number) => {
      setPage(_page);
    },
    [setPage]
  );
  return (
    <div
      className={styles.paginationWrapper}
    >
      {firstPage < page && (
        <button
          className={styles.buttonProperties}
          onClick={() => {
            handlePageClick(page - 1);
          }}
        >
          <a onClick={(e: any) => e.preventDefault()}>Prev</a>
        </button>
      )}

      {firstPage < page - 1 && (
        <button
          className={styles.buttonProperties}
          onClick={() => {
            handlePageClick(firstPage);
          }}
        >
          <a onClick={(e: any) => e.preventDefault()}>{firstPage}</a>
        </button>
      )}

      {firstPage + 1 < page - 1 && (
        <button
          className={styles.buttonProperties}
        >

          <a onClick={(e: any) => e.preventDefault()}>....</a>
        </button>
      )}

      {page - 1 > 0 && (
        <button
          className={styles.buttonProperties}
          onClick={() => {
            handlePageClick(page - 1);
          }}
        >
          <a onClick={(e: any) => e.preventDefault()}>{page - 1}</a>
        </button>
      )}

      <button

        className={`${styles.active} ${styles.buttonProperties}`}
        onClick={() => {
          handlePageClick(page);
        }}
      >
        <a onClick={(e: any) => e.preventDefault()}>{page}</a>
      </button>

      {page + 1 < lastPage + 1 && (
        <button
          className={styles.buttonProperties}
          onClick={() => {
            handlePageClick(page + 1);
          }}
        >
          <a onClick={(e: any) => e.preventDefault()}>{page + 1}</a>
        </button>
      )}

      {lastPage - 1 > page + 1 && (
        <button
          className={styles.buttonProperties}
        >
          <a onClick={(e: any) => e.preventDefault()}>....</a>
        </button>
      )}

      {lastPage > page + 1 && (
        <button
          className={styles.buttonProperties}
          onClick={() => {
            handlePageClick(lastPage);
          }}
        >
          <a onClick={(e) => e.preventDefault()}>{lastPage}</a>
        </button>
      )}

      {page < lastPage && (
        <button
          className={styles.buttonProperties}
          onClick={() => {
            handlePageClick(page + 1);
          }}
        >
          <a onClick={(e: any) => e.preventDefault()}>Next</a>
        </button>
      )}
    </div>
  );
};

export default PaginationControl;

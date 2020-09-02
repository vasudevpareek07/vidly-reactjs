import React, { Component } from "react";

import _ from "lodash";

const Pagination = (props) => {
  const { pageSize, count } = props;

  const pagesCount = Math.ceil(count / pageSize);

  if (pagesCount === 1) {
    return null;
  }

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={
              props.currentPage === page
                ? "clickable page-item active"
                : "clickable page-item"
            }
            key={page}
            onClick={() => {
              props.onPageChange(page);
            }}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

// class Pagination extends Component {

// }

// export default Pagination;

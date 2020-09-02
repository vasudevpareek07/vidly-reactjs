import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
  const { data, columns, sortColumn, onSort } = props;
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader
          tableHeaderDetails={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        ></TableHeader>
        <TableBody data={data} columns={columns}></TableBody>
      </table>
    </React.Fragment>
  );
};

export default Table;

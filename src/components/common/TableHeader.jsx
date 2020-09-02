import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (column) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.column === column) {
      sortColumn.order = this.props.sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    console.log("aA", sortColumn);
    if (sortColumn.column !== column.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;

    return <i className="fa fa-sort-desc"></i>;
  };

  state = {};
  render() {
    console.log("getting props", this.props);
    return (
      <thead>
        <tr>
          {this.props.tableHeaderDetails.map((column) => (
            <th
              className="clickable"
              key={column.label || column.key}
              onClick={() => {
                this.raiseSort(column.path);
              }}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

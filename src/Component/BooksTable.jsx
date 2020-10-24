import React, { Component } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
class BooksTable extends Component {
  render() {
    const { books, onSort, sortColumn } = this.props;
    const columns = [
      {
        key: "img",
        content: (book) => <img src={book.img} alt="" />,
      },

      { path: "title", label: "Title" },
      { path: "author", label: "Author" },
      { path: "publishedDate", label: "Publish Date" },
      {
        key: "del",
        content: (book) => (
          <button
            className="btn btn-danger btn-sm "
            onClick={() => this.props.hundleDelete(book.title)}
          >
            Remove from List
          </button>
        ),
      },
    ];
    return (
      <div className="container">
        <div className="row">
          <table className="table text-center">
            <TableHeader
              columns={columns}
              onSort={onSort}
              sortColumn={sortColumn}
            />
            <TableBody data={books} columns={columns} />
          </table>
        </div>
      </div>
    );
  }
}

export default BooksTable;

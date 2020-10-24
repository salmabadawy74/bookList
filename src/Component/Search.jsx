import React from "react";

const Search = ({ value, onChange, toggle }) => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-3">
          <button
            to="/Modal"
            className="btn btn-primary nav-link my-3 "
            onClick={toggle}
          >
            Add New Book
          </button>
        </div>
        <div className="col-9">
          <input
            className="form-control my-3 w-60"
            type="text"
            name="query"
            value={value}
            placeholder="Search...."
            onChange={(e) => onChange(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;

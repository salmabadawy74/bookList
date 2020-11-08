import React, { Component } from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import axios from "axios";
import Modal from "./Modal";
import _ from "lodash";

import BooksTable from "./BooksTable";
class BookStore extends Component {
  state = {
    books: [],
    newBookData: {
      title: "",
      author: "",
      publishedDate: "",
      img: "",
    },

    modalOpen: true,
    searchQuery: "",
    sortColumn: { path: "title", sort: "asc" },
    errors: {},
  };
  async componentDidMount() {
    await axios
      .get("https://my-json-server.typicode.com/salmabadawy74/Book/books")
      .then((res) => {
        console.log(res.data);
        this.setState({
          books: res.data,
        });
      });
  }
  refreshPage = () => {
    axios
      .get("https://my-json-server.typicode.com/salmabadawy74/Book/books")
      .then((res) => {
        console.log(res.data);
        this.setState({
          books: res.data,
        });
      });
  };
  hundleChange = (e) => {
    const { name, value } = e.target;
    const { newBookData } = this.state;
    this.state.newBookData[name] = value;
    this.setState({
      newBookData,
    });
  };

  addImageHandler = (e) => {
    // this.setState({ image: null, videos: null });
    let newBook = { ...this.state.newBookData };
    const files = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result.split(":")[1].split("/")[0] === "image") {
          newBook.img = reader.result;
          this.setState({ newBookData: newBook });
        }
      }
    };
    if (files) {
      reader.readAsDataURL(files);
    }
  };

  toggle = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  hundleSubmit = (e) => {
    const { books, newBookData } = this.state;
    books.push(newBookData);
    this.setState({
      books,
      newBookData: {
        title: "",
        author: "",
        publishedDate: "",
        img: "",
      },
    });
  };

  hundleDelete = (book) => {
    const books = this.state.books.filter((b) => b.title !== book);
    this.setState({ books });
  };
  hundleSearch = (Query) => {
    this.setState({
      searchQuery: Query,
    });
  };
  onSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  render() {
    const { books: Allbooks, sortColumn } = this.state;

    let filteredbook = this.state.books.filter((boo) => {
      return (
        boo.title
          .toLowerCase()
          .includes(this.state.searchQuery.toLowerCase()) ||
        boo.author.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    });
    const sortedbook = _.orderBy(
      filteredbook,
      sortColumn.path,
      sortColumn.sort
    );

    return (
      <>
        <Navbar modalOpen={this.state.modalOpen} toggle={this.toggle} />
        <Search
          value={this.state.searchQuery}
          onChange={this.hundleSearch}
          toggle={this.toggle}
        />

        <BooksTable
          books={sortedbook}
          hundleDelete={this.hundleDelete}
          onSort={this.onSort}
          sortColumn={sortColumn}
        />

        <Modal
          toggle={this.toggle}
          modalOpen={this.state.modalOpen}
          data={this.state.newBookData}
          hundleChange={this.hundleChange}
          addImageHandler={this.addImageHandler}
          hundleSubmit={this.hundleSubmit}
          errors={this.state.errors}
        />
      </>
    );
  }
}

export default BookStore;

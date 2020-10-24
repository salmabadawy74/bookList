import React from "react";
import styled from "styled-components";
import joi from "joi";
const Modal = (props) => {
  const { data, hundleSubmit, hundleChange, modalOpen, toggle } = props;

  const schema = {
    title: joi.string().required(),
    author: joi.string().required(),
    publishedDate: joi.date().required(),
  };
  const validate = () => {
    const result = joi.validate(data, schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const formError = validate();
  {
    if (modalOpen) {
      return null;
    } else {
      return (
        <ModalContainer>
          <div className="container">
            <div className="row">
              <div
                id="Modal"
                className="col-9 mx-auto  col-md-6 text-center text-capitalize card p-5"
              >
                <h5 className="  header-text">
                  ADD New Book to Favourite List
                </h5>
                <form className="mt-4">
                  <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                      title
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        className="form-control"
                        id="title"
                        name="title"
                        placeholder="Name of the Book"
                        value={data.title}
                        onChange={(e) => hundleChange(e)}
                      />
                      {formError.title && (
                        <div className="alert alert-danger">
                          {formError.title}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="author" className="col-sm-2 col-form-label">
                      author
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        className="form-control"
                        id="author"
                        name="author"
                        placeholder="Author"
                        value={data.author}
                        onChange={(e) => hundleChange(e)}
                      />
                      {formError.author && (
                        <div className="alert alert-danger">
                          {formError.author}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="publishedDate"
                      className="col-sm-2 col-form-label"
                    >
                      Publish Date
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        className="form-control"
                        id="publishedDate"
                        name="publishedDate"
                        placeholder="Release Date"
                        value={data.Release_Date}
                        onChange={(e) => hundleChange(e)}
                      />
                      {formError.publishedDate && (
                        <div className="alert alert-danger">
                          {formError.publishedDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="img" className="col-sm-2 col-form-label">
                      Cover Image
                    </label>
                    <div className="col-sm-10">
                      <input
                        required
                        className="form-control"
                        id="img"
                        name="img"
                        placeholder="Image URL ..."
                        value={data.img}
                        onChange={(e) => hundleChange(e)}
                      />
                    </div>
                  </div>
                </form>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    hundleSubmit(e);
                    toggle();
                  }}
                >
                  ADD New Book
                </button>{" "}
              </div>
            </div>
          </div>
        </ModalContainer>
      );
    }
  }
};

export default Modal;
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: #fff;
    border-radius: 10px;
    padding: 20px 0;
  }
`;

import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../utils/api/api";
import AllBooks from "./AllBooks";

const Books = () => {
  const [loading, setLoading] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  const getBooks = useCallback(async () => {
    setLoading(true);
    const res = await getData("books/getBooks");
    setAllBooks(res);
    setLoading(false);
  }, []);
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div className="allBooks my-5 top-margin">
      <div className="container">
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <div className="row">
          {allBooks?.map((book) => (
            <AllBooks key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;

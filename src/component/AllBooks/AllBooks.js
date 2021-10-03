import React, { useContext } from "react";
import { addToCart } from "../../store/Actions";
import { DataContext } from "../../store/globaStore";

const AllBooks = ({ book }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const { bookImage, bookName, authorName, price } = book;

  const handleBook = (book) => {
    dispatch(addToCart(book, cart, auth.user.user_id));
  };

  return (
    <div className="col-md-4 p-3">
      <div className="bg-light rounded my-3">
        <img
          src={`data:image/png;base64,${bookImage.image}`}
          alt="bookImage"
          className="w-100 p-5"
        />
      </div>
      <h5 className="card-text fw-bold">{bookName}</h5>
      <p className="text-secondary">{authorName}</p>
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="color fw-bold">${price}</h2>
        <button
          className="btn bg-color"
          onClick={() => {
            handleBook(book);
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AllBooks;

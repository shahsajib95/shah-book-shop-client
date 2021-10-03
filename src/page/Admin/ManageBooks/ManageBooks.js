import React, { useCallback, useContext, useEffect, useState } from "react";
import AdminNav from "../../../component/Admin/AdminNav/AdminNav";
import { deleteData, getData } from "../../../component/utils/api/api";
import { BiEdit, BiTrash } from "react-icons/bi";
import { DataContext } from "../../../store/globaStore";

const ManageBooks = () => {

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

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

  const deleteBook = async (id)=>{
    const res = await deleteData(`admin/deleteBook/${id}`, auth.token);
    if(res.err)  dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    getBooks()
    if(res.success) return dispatch({ type: 'NOTIFY', payload: {success: res.success} })
  }

  return (
    <div className="d-flex admin">
      <AdminNav />
      <div className="page-content-wrapper bg-light">
        <div className="p-3 bg-white w-100">
          <h4 className="fw-bold">Add Books</h4>
        </div>
        <div className="admin-content bg-light p-5">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="bg-white p-5">
              <table className="table table-responsive bg-white">
                <thead>
                  <tr className="text-secondary bg-light">
                    <th scope="col">Book Name</th>
                    <th scope="col">Author Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="fw-bold">
                  {allBooks.map((book) => (
                    <tr key={book._id}>
                      <td>{book.bookName}</td>
                      <td>{book.authorName}</td>
                      <td>${book.price}</td>
                      <td>
                        <BiEdit className="bg-success text-white" style={{ cursor: "pointer" }} />{" "}
                        <BiTrash onClick={()=> deleteBook(book._id)} className="bg-danger text-white" style={{ cursor: "pointer" }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageBooks;

import React, { useContext } from "react";
import AdminNav from "../../../component/Admin/AdminNav/AdminNav";
import { BsCloudUpload } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { submitFormData } from "../../../component/utils/api/api";
import {DataContext} from '../../../store/globaStore'

const AddBooks = () => {
  const { register, handleSubmit, watch,  formState: { errors } } = useForm();
  const imageName = watch("bookImage")

  const {dispatch} = useContext(DataContext)

  const onSubmit = async data =>{ 
    const formData = new FormData();
    formData.append('bookName', data.bookName)
    formData.append('authorName', data.authorName)
    formData.append('price', Number(data.price))
    formData.append('bookImage', data.bookImage[0])
    dispatch({ type: 'NOTIFY', payload: {loading: true} })
    const res = await submitFormData('admin/addBooks', formData)
    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })
    return dispatch({ type: 'NOTIFY', payload: {success: res.msg} })
  };


  return (
    <div className="d-flex admin">
      <AdminNav />
      <div className="page-content-wrapper bg-light">
        <div className="p-3 bg-white w-100">
          <h4 className="fw-bold">Add Books</h4>
        </div>
        <form className="add-book-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-content bg-light">
            <div className="rounded bg-white p-5 mt-5 ms-5 me-5">
              <div className="row">
                <div className="col">
                  <label for="formFile" className="form-label">
                    Book Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("bookName", { required: true })}
                    placeholder="Book name"
                  />
                </div>
                {errors.bookName && <span>Book Name is required</span>}
                <div className="col">
                  <label for="formFile" className="form-label">
                    Author Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Author name"
                    {...register("authorName", { required: true })}
                  />
                </div>
                {errors.authorName && <span>Author Name is required</span>}
              </div>
              <div className="row my-3">
                <div className="col">
                  <label for="formFile" className="form-label">
                    Add Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    {...register("price", { required: true })}
                  />
                     {errors.price && <span>price Name is required</span>}
                </div>
                <div className="col">
                  <label for="formFile" className="form-label">
                    Add Book Cover Photo
                  </label>
                  <div className="upload-btn border rounded border-primary color bg-light p-2">
                    <input
                      className="file_input_with_replacement"
                      type="file"
                      {...register("bookImage", { required: true })}
                    />
                    <span className="file-btn"><BsCloudUpload /> {imageName ? imageName[0]?.name : ' Upload Image'}</span>
                  </div>
                </div>
              </div>
              <button type="submit" className="btn bg-color text-white mt-4">
                save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;

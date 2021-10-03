import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  googleSignIn,
  registerWithEmail,
  idToken,
} from "../../component/utils/auth";
import "./Register.css";
import { useHistory, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { DataContext } from "../../store/globaStore";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { dispatch } = useContext(DataContext);
  const [error, setError] = useState(null);

  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };
  const onSubmit = async (data) => {
    setError(null);
    if (data.password !== data.cf_password)
      return setError("Password not matched");
    const res = await registerWithEmail(data.name, data.email, data.password);
    if (res.email) {
      const token = await idToken();
      dispatch({ type: "AUTH", payload: { user: res, token: token } });
      history.push(from);
    } else {
      setError(res);
    }
  };
  const google = async () => {
    const res = await googleSignIn();
    if (res.email) {
      const token = await idToken();
      dispatch({ type: "AUTH", payload: { user: res, token: token } });
      history.push(from);
    } else {
      setError(res);
    }
  };

  return (
    <div
      className="top-margin container mx-auto form card p-5"
      style={{ width: "500px" }}
    >
      <h1>Create an account</h1>
      {error && <span>*{error}</span>}
      {errors.name && <div className="form-text">*Name is required</div>}
      {errors.email && <div className="form-text">*Email is required</div>}
      {errors.password && (
        <div className="form-text">*Password is required</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Confirm Password"
            {...register("cf_password", { required: true })}
          />
        </div>

        <button className="w-100 bg-color btn mt-4" type="submit">
          Create an account
        </button>
      </form>
      <p className="my-2 text-center">
        Already have an account?{" "}
        <Link to="/login">
          <u className="color">Login</u>
        </Link>
      </p>
      <p
        className="mt-3 p-2 border rounded-pill text-center"
        style={{ cursor: "pointer" }}
        onClick={google}
      >
        <FcGoogle style={{ fontSize: "2rem" }} />
      </p>
    </div>
  );
};

export default Register;

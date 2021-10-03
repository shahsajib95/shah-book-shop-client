import { useContext } from "react";
import { DataContext } from "../store/globaStore";
import Loading from "./Loading/Loading";
import Toast from "./Toast";

const Notify = () => {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  return (
    <>
      {notify.loading && <Loading />}
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}

      {notify.success && (
        <Toast
          msg={{ msg: notify.success, title: "Success" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-success"
        />
      )}
    </>
  );
};

export default Notify;

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="p-5 text-center mt-5">
      <h1 style={{ fontSize: "5rem" }} className="text-primary">
        404
      </h1>
      <h3 style={{ fontSize: "2rem" }} className="text-primary">
        The page you are looking for is not there
      </h3>
      <Link href="/">
        <button className="btn btn-primary text-white">Home</button>
      </Link>
    </div>
  );
};

export default NotFound;

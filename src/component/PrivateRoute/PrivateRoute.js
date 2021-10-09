import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { DataContext } from "../../store/globaStore";

const PrivateRoute = ({ children, ...rest }) => {
  const { state } = useContext(DataContext);
  const { auth } = state;
  return (
    <div>
      <Route
        {...rest}
        render={({ location }) =>
        auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

export default PrivateRoute;

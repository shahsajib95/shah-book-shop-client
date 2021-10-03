import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
import ManageBooks from "./page/Admin/ManageBooks/ManageBooks";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import AddBooks from "./page/Admin/AddBooks/AddBooks";
import { DataProvider } from "./store/globaStore";
import Notify from "./component/Notify";
import EditBooks from "./page/Admin/EditBooks/EditBooks";
import NavBar from "./component/NavBar/NavBar";
import Books from "./component/AllBooks/Books";
import CheckOut from "./page/CheckOut/CheckOut";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Order from "./page/Order/Order";

function App() {
  return (
    <DataProvider>
      <Router>
        <Notify />
        <Switch>
          <Route exact path="/">
            <NavBar />
            <Books />
          </Route>
          <PrivateRoute path="/CheckOut">
            <NavBar />
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path="/Orders">
            <NavBar />
            <Order />
          </PrivateRoute>

          <Route path="/login">
            <NavBar />
            <Login />
          </Route>
          <Route path="/register">
            <NavBar />
            <Register />
          </Route>

          <PrivateRoute exact path="/admin/manage-books">
            <ManageBooks />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/add-books">
            <AddBooks />
          </PrivateRoute>
          <PrivateRoute exact path="/admin/edit-books">
            <EditBooks />
          </PrivateRoute>

          <Route path="*">Error</Route>
        </Switch>
      </Router>
    </DataProvider>
  );
}

export default App;

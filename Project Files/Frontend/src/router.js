// src/router.js
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";
import PrivateRoute from "./components/common/PrivateRoute";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/adminhome",
      element: (
        <PrivateRoute>
          <AdminHome />
        </PrivateRoute>
      ),
    },
    {
      path: "/userhome",
      element: (
        <PrivateRoute>
          <UserHome />
        </PrivateRoute>
      ),
    },
    {
      path: "/userhome/userappointments/:doctorId",
      element: (
        <PrivateRoute>
          <UserAppointments />
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <Home />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;

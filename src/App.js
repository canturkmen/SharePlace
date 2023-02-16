import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Users from "./user/pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { index: true, element: <Users /> },
      { path: "/places/new", element: <NewPlace /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AuthPage from "./user/pages/Auth";

import Users from "./user/pages/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {index: true, element: <Users />},
      {
        path: ":userId",
        children: [{ path: "places", element: <UserPlaces /> }],
      },
      {
        path: "places",
        children: [
          { path: "new", element: <NewPlace /> },
          { path: ":placeId", element: <UpdatePlace /> },
        ],
      },
      {
        path: "auth",
        element: <AuthPage />
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

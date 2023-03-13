import React, { useCallback, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
import UserPlaces from "./places/pages/UserPlaces";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import AuthPage from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";

import Users from "./user/pages/Users";

const unloggedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { index: true, element: <Users /> },
      {
        path: ":userId",
        children: [{ path: "places", element: <UserPlaces /> }],
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);

const loggedRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation/>,
    children: [
      { index: true, element: <Users /> },
      {
        path: ":userId",
        children: [{ path: "places", element: <UserPlaces /> }],
      },
      {
        path: "places",
        children: [{path: ":placeId", element: <UpdatePlace/>}, {path: "new", element: <NewPlace />}]
      }
    ]
  }
]);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let element;
  if(isLoggedIn) {
    element = <RouterProvider router={loggedRouter} />
  } else {
    element = <RouterProvider router={unloggedRouter} />
  }
  
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      {element}
    </AuthContext.Provider>
  );
};

export default App;

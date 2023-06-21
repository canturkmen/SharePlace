import React, { useCallback, useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
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
    element: <MainNavigation />,
    children: [
      { index: true, element: <Users /> },
      {
        path: ":userId",
        children: [{ path: "places", element: <UserPlaces /> }],
      },
      {
        path: "places",
        children: [
          { path: ":placeId", element: <UpdatePlace /> },
          { path: "new", element: <NewPlace /> },
        ],
      },
    ],
  },
]);

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if(storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  let element;
  if (token) {
    element = <RouterProvider router={loggedRouter} />;
  } else {
    element = <RouterProvider router={unloggedRouter} />;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {element}
    </AuthContext.Provider>
  );
};

export default App;

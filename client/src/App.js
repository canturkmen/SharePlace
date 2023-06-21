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

let logoutTimer;

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
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  // Auto Log-In (When we refresh the page, we make sure that we log-in the user if there is a token)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  // Auto Log-Out (When the token expires, we make sure that the user is logged out)
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpirationDate, logout]);

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

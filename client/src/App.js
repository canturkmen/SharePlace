import React, { useCallback, useEffect, useState, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

// import Users from "./user/pages/Users";
// import NewPlace from "./places/pages/NewPlace";
// import UpdatePlace from "./places/pages/UpdatePlace";
// import UserPlaces from "./places/pages/UserPlaces";
// import AuthPage from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import LoadingSpinner from "./shared/components/UIComponents/LoadingSpinner";

const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const AuthPage = React.lazy(() => import("./user/pages/Auth"));

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
  const { token, login, logout, userId } = useAuth();

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
      <Suspense fallback={<div className="center"><LoadingSpinner /></div>}>{element}</Suspense>
    </AuthContext.Provider>
  );
};

export default App;

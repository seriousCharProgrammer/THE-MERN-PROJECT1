import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStatus } from '../hooks/userAuthStatus';
import Spinner from './Spinner';
export default function PrivateRoute() {
  const { loggedIn, CheckingStatus } = useAuthStatus();
  if (CheckingStatus === true) {
    return <Spinner />;
  }
  if (loggedIn === true) {
    return <Outlet />;
  } else if (loggedIn === false) {
    return <Navigate to='/login' />;
  }
}

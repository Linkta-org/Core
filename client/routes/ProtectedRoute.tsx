import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '@components/common/Loader';
import useWatchAuthenticatedState from '@hooks/useWatchAuthenticatedState';
/**
 * A higher-order component that guards child routes, ensuring they are accessible only to authenticated users.
 * It leverages the `useAuth` hook to determine the user's authentication status.
 * Unauthenticated users are redirected to the login page.
 */
const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useWatchAuthenticatedState();

  console.log('isAuthenticated', isAuthenticated);
  console.log('isLoading', isLoading);

  if (isLoading) {
    return <Loader />;
  }
  // TODO: add error handling
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate
          to='/login'
          replace={true}
        />
      )}
    </>
  );
};

export default ProtectedRoute;

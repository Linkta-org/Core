import React from 'react';
import { RouterProvider } from 'react-router-dom';
import IndexRouter from '@routes/index';
import NotificationContainer from '@components/common/NotificationContainer';

interface AppProps {
  router?: ReturnType<typeof IndexRouter>;
}

const App: React.FC<AppProps> = ({ router = IndexRouter() }) => {
  return (
    <>
      <RouterProvider router={router} />
      <NotificationContainer />
    </>
  );
};

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// pages

import { HomeLayout, Login, Register, Error, Dashboard } from './pages';
import NavigationBar from './pages/NavigationBar';

// Loader and actions
import { action as loginAction } from './pages/Login';
import { action as registerAction } from './pages/Register';
import { action as DashboardAction } from './pages/Dashboard';
import { loader as DashboardLoader } from './pages/Dashboard';
import { loader as navigationBarLoader } from './pages/NavigationBar';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Login />,
          action: loginAction,
        },
        {
          path: 'login',
          element: <Login />,
          action: loginAction,
        },
        {
          path: 'register',
          element: <Register />,
          action: registerAction,
        },
        {
          path: 'dashboard',
          element: <NavigationBar queryClient={queryClient} />,
          loader: navigationBarLoader(queryClient),
          children: [
            {
              index: true,
              element: <Dashboard />,
              action: DashboardAction(queryClient),
              loader: DashboardLoader(queryClient),
            },
          ],
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default App;

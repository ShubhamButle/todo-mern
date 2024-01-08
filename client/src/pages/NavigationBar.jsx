import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/NavigationBar';
import { Logo, LogoutContainer } from '../components';
import { createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const navigationContext = createContext();

const userQuery = {
  queryKey: ['user'],
  queryFn: async () => {
    const { data } = await customFetch('/user');
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect('/');
  }
};

const NavigationBar = ({ queryClient }) => {
  const navigate = useNavigate();

  const { user } = useQuery(userQuery)?.data;
  const logoutUser = async () => {
    try {
      navigate('/');
      await customFetch.get('/auth/logout');
      queryClient.invalidateQueries();
      toast.success('user Logout successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <>
      <Wrapper>
        <navigationContext.Provider value={{ user, logoutUser, queryClient }}>
          <div className='content'>
            <header id='headerTop'>
              <Logo />
              <LogoutContainer />
            </header>
            <Outlet />
          </div>
        </navigationContext.Provider>
      </Wrapper>
    </>
  );
};

export const useNavigationContext = () => useContext(navigationContext);
export default NavigationBar;

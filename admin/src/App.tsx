import React, { FC, Suspense, useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import { onVerifyToken } from '@/redux/actions/auth';
import LoadingPage from '@/common/LoadingPage';
import Homelayout from './layouts/Homelayout';

const App: FC = () => {

  const { user } = useAppSelector((app) => app.auth);
  const isLogged = sessionStorage.getItem('isLogged');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(onVerifyToken());
  // }, [dispatch, isLogged, navigate]);
  // useEffect(() => {
  //   if (!isLogged && window.location.pathname !== '/register') {
  //     navigate('/login');
  //   }
  // }, [isLogged, navigate]);


  return (
    <Suspense fallback={<LoadingPage />}>
      {!isLogged ? (
        <>
          <Homelayout />
        </>
      ) : (
        <>
          <Homelayout />
        </>
      )}
    </Suspense>
  );
};

export default App;

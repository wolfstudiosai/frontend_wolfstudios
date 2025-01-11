'use client';

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, server_base_api } from '@/utils/api';
import { jwtDecode } from 'jwt-decode';

import { paths } from '@/paths';

import { removeTokenFromCookies, setTokenInCookies } from '/src/utils/axios-api.helpers';

// import { removeTokenFromCookies, setTokenInCookies } from 'utils/axios-api.helpers';

export const INITIAL_AUTH_STATE = {
  token: '',
  is_token_valid: false,
  name: '',
  email: '',
  contact_number: '',
  profile_pic: '',
  role: 'USER',
};

export const AuthContext = createContext({
  userInfo: INITIAL_AUTH_STATE,
  isLogin: false,
  login: () => {},
  logout: () => {},
});

export const isValidToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (e) {
    return false;
  }
};

export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState(INITIAL_AUTH_STATE);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
    const auth = localStorage.getItem('auth');
    if (auth) {
      const data = JSON.parse(auth);
      const isTokenValid = isValidToken(data.token);
      setUserInfo({ ...data, is_token_valid: isTokenValid });
      //   api.defaults.headers.common['auth-Token'] = `${data.token}`;
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password, onError) => {
    setLoading(true);
    try {
      const res = await server_base_api.post('/auth/login', {
        email: email,
        password: password,
      });
      const token = res.data.data.token;

      const userData = {
        token: token,
        is_token_valid: true,
        name: res.data.data.name,
        email: res.data.data.email,
        contact_number: res.data.data.contact_number,
        profile_pic: res.data.data.profile_pic,
        role: res.data.data.role,
      };
      localStorage.setItem('auth', JSON.stringify({ ...userData }));

      setTokenInCookies(userData.token);
      setUserInfo(userData);

      setLoading(false);
      router.push(paths.dashboard.overview);
    } catch (error) {
      onError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(INITIAL_AUTH_STATE);
    delete api.defaults.headers.common['Authorization'];
    removeTokenFromCookies();
    router.push(paths.auth.default.sign_in);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        userInfo,
        isLogin: userInfo.is_token_valid,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

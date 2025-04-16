'use client';

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import { api, server_base_api } from '/src/utils/api';
import { removeTokenFromCookies, setTokenInCookies } from '/src/utils/axios-api.helpers';

export const INITIAL_AUTH_STATE = {
  id: '',
  token: '',
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
      setUserInfo(data);
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
      const token = res.data.data.accessToken;

      const userData = {
        id: res.data.data.id,
        token: token,
        name: res.data.data.name,
        email: res.data.data.email,
        contact_number: res.data.data.contactNumber,
        profile_pic: res.data.data.profileImage,
        role: res.data.data.role,
        workspaces: res.data.data?.WorkspaceMembers?.map((member) => member?.Workspace),
      };
      localStorage.setItem('auth', JSON.stringify({ ...userData }));
      localStorage.setItem('accessToken', token);

      setTokenInCookies(userData.token);
      setUserInfo(userData);

      setLoading(false);

      if (res.status === 200) {
        return {
          success: true,
          data: res.data.data,
        };
      }
      return {
        success: false,
        data: res.data.data,
      };
      // router.push(paths.home);
    } catch (error) {
      onError(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(INITIAL_AUTH_STATE);
    delete api.defaults.headers.common['Authorization'];
    removeTokenFromCookies();
    // router.push(paths.home);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        userInfo,
        isLogin: isValidToken(userInfo.token),
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

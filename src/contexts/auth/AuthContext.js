'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useSession } from "next-auth/react";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';

import { api, server_base_api } from '/src/utils/api';
import { setTokenInCookies, removeTokenFromCookies } from '/src/utils/axios-api.helpers';

// ---- Initial User State ----
const INITIAL_AUTH_STATE = {
  id: '',
  token: '',
  name: '',
  email: '',
  contact_number: '',
  profile_pic: '',
  role: 'USER',
};

// ---- Auth Context Definition ----
export const AuthContext = createContext({
  userInfo: INITIAL_AUTH_STATE,
  isLogin: false,
  login: () => { },
  logout: () => { },
  updateUserInfo: () => { },
  setUserInfo: () => { },
});

// ---- Token Validation ----
const isValidToken = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp > Date.now() / 1000;
  } catch {
    return false;
  }
};

// ---- Extract Common User Mapping ----
const extractUserData = (data) => ({
  id: data.id,
  token: data.accessToken,
  name: data.name,
  email: data.email,
  contact_number: data.contactNumber,
  profile_pic: data.profileImage,
  role: data.role,
  workspaces: data?.WorkspaceMembers?.map((member) => member?.Workspace),
});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(INITIAL_AUTH_STATE);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  // ---- Handle Social Auth Flow ----
  const handleSocialAuth = useCallback(async (type, authType, user) => {
    const payload = {
      authType: authType,
      authId: user.id,
      email: user.email,
      username: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
    };

    try {
      const endpoint = type === 'LOGIN' ? '/auth/login' : '/auth/signup';
      const res = await server_base_api.post(endpoint, payload);
      if (!res.data.success) throw new Error('Auth failed');

      const userData = extractUserData(res.data.data);
      localStorage.setItem('auth', JSON.stringify(userData));
      localStorage.setItem('accessToken', userData.token);

      setTokenInCookies(userData.token);
      setUserInfo(userData);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Google auth failed');
    } finally {
      localStorage.removeItem('socialButton');
      setLoading(false);
    }
  }, []);

  // ---- Google Session Effect ----
  useEffect(() => {
    const socialButton = localStorage.getItem('socialButton');
    if (session?.user?.id && socialButton && !isValidToken(userInfo.token)) {
      const [type, authType] = socialButton.split('|');
      handleSocialAuth(type, authType, session.user);
    }
  }, [session, handleSocialAuth]);

  // ---- Load Initial Auth ----
  useEffect(() => {
    const storedUser = localStorage.getItem('auth');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (isValidToken(parsedUser.token)) {
        setUserInfo(parsedUser);
      }
    }
    setLoading(false);
  }, []);

  // ---- Email/Password or Social Login ----
  const login = async ({ email, password, authType, authId, onError }) => {
    setLoading(true);
    try {
      const payload = authType === 'EMAIL_PASSWORD'
        ? { email, password, authType }
        : { authId, authType };

      const res = await server_base_api.post('/auth/login', payload);
      const userData = extractUserData(res.data.data);

      localStorage.setItem('auth', JSON.stringify(userData));
      localStorage.setItem('accessToken', userData.token);

      setTokenInCookies(userData.token);
      setUserInfo(userData);

      return { success: true, data: res.data.data };
    } catch (err) {
      onError?.(err?.response?.data?.message || 'Login failed');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // ---- Logout ----
  const logout = () => {
    localStorage.clear();
    removeTokenFromCookies();
    setUserInfo(INITIAL_AUTH_STATE);
    delete api.defaults.headers.common['Authorization'];
  };

  // ---- Update User Info Locally ----
  const updateUserInfo = (updates) => {
    const updated = { ...userInfo, ...updates };
    setUserInfo(updated);
    localStorage.setItem('auth', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        isLogin: isValidToken(userInfo.token),
        login,
        logout,
        updateUserInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

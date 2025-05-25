'use client';

import React, { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

import { api, server_base_api } from '/src/utils/api';
import { removeTokenFromCookies, setTokenInCookies } from '/src/utils/axios-api.helpers';
import { toast } from 'sonner';
import { useSession } from "next-auth/react"

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
  // loading: false,
  isLogin: false,
  login: () => { },
  logout: () => { },
  updateUserInfo: () => { },
  setUserInfo: () => { },
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
  const [socialButton, setSocialButton] = useState('');
  const { data: session } = useSession();

  // handle google signup
  const handleGoogleSignup = async (user) => {
    const payload = {
      authType: "GOOGLE",
      authId: user.id,
      email: user.email,
      username: user.name,
      firstName: user.given_name,
      lastName: user.family_name,
    }

    try {
      const res = await server_base_api.post('/auth/signup', payload);

      if (res.data.success) {
        const userData = {
          id: res.data.data.id,
          token: res.data.data.accessToken,
          name: res.data.data.name,
          email: res.data.data.email,
          contact_number: res.data.data.contactNumber,
          profile_pic: res.data.data.profileImage,
          role: res.data.data.role,
          workspaces: res.data.data?.WorkspaceMembers?.map((member) => member?.Workspace),
        };

        // save user data in local storage
        localStorage.setItem('auth', JSON.stringify({ ...userData }));
        localStorage.setItem('accessToken', res.data.data.accessToken);

        setTokenInCookies(res.data.data.accessToken);
        setUserInfo(userData);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      localStorage.removeItem('socialButton');
      setLoading(false);
    }
  }

  // handle google login
  const handleGoogleLogin = async (user) => {
    setLoading(true);
    try {
      const res = await server_base_api.post('/auth/login', {
        authType: 'GOOGLE',
        authId: user.id,
      });

      console.log(res);

    } catch (error) {
      console.log(error);
    } finally {
      localStorage.removeItem('socialButton');
      setLoading(false);
    }
  }

  // handle google
  React.useEffect(() => {
    if (session?.user?.id && isValidToken(userInfo.token)) {
      if (socialButton === 'LOGIN') {
        handleGoogleLogin(session.user);
      } else {
        handleGoogleSignup(session.user);
      }
    }
  }, [session]);
  console.log(session);

  React.useEffect(() => {
    setLoading(true);
    const auth = localStorage.getItem('auth');
    setSocialButton(localStorage.getItem('socialButton') || '');
    if (auth) {
      const data = JSON.parse(auth);
      setUserInfo(data);
    }
    setLoading(false);
  }, []);

  const handleLogin = async ({ email, password, authType, authId, onError }) => {
    setLoading(true);
    try {
      let payload = {}

      if (authType === "EMAIL_PASSWORD") {
        payload = {
          email,
          password,
          authType,
        }
      } else {
        payload = {
          authId,
          authType,
        }
      }

      const res = await server_base_api.post('/auth/login', payload);
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

      // save user data in local storage
      localStorage.setItem('auth', JSON.stringify({ ...userData }));
      localStorage.setItem('accessToken', token);

      setTokenInCookies(token);
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

  const updateUserInfo = (updatedFields) => {
    const updatedUser = {
      ...userInfo,
      ...updatedFields,
    };

    setUserInfo(updatedUser);
    localStorage.setItem('auth', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        // loading,
        isLogin: isValidToken(userInfo.token),
        login: handleLogin,
        logout: handleLogout,
        updateUserInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

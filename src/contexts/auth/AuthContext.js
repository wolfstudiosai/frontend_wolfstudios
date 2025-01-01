"use client";
import { getProfileData } from "@/app/dashboard/settings/_lib/actions";
import { api, server_base_api } from "@/utils/api";
import { removeTokenFromCookies, setTokenInCookies } from "@/utils/axios-api.helpers";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import React, { createContext, useState } from "react";
// import { removeTokenFromCookies, setTokenInCookies } from 'utils/axios-api.helpers';

export const INITIAL_AUTH_STATE = {
    token: "",
    name: "",
    email: "",
    contact_number: "",
    profile_pic: "",
    role: "USER",
};

export const AuthContext = createContext({
    userInfo: INITIAL_AUTH_STATE,
    isLogin: false,
    login: () => { },
    logout: () => { },
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

    async function fetchProfileData() {
        try {
            const response = await getProfileData();
            if (response.success) {
                setUserInfo({
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    contact_number: response.data.contact_number,
                    profile_pic: response.data.profile_pic,
                    role: response.data.role,
                });
            } else {
                setUserInfo(INITIAL_AUTH_STATE);
            }
        } catch (error) {
            return null;
        }
    }
    React.useEffect(() => {
        const auth = localStorage.getItem("auth");
        if (auth) {
            const data = JSON.parse(auth);
            const token = data.token;
            const expirationTime = jwtDecode(token).exp * 1000;
            const currentTime = Date.now() / 1000;

            const isValidToken = expirationTime > currentTime;
            if (isValidToken) {
                fetchProfileData();
                api.defaults.headers.common["Authorization"] = `${data.token}`;
            } else {

                localStorage.removeItem("auth");
            }
        }

    }, [])


    const handleLogin = async (email, password, onError) => {
        try {
            const res = await server_base_api.post("/auth/login", {
                email: email,
                password: password,
            });

            const decodedToken = jwtDecode(res.data.data.token);
            const expirationTime = decodedToken.exp * 1000;


            const userData = {
                token: res.data.data.token,
                name: res.data.data.name,
                email: res.data.data.email,
                contact_number: res.data.data.contact_number,
                profile_pic: res.data.data.profile_pic,
                role: res.data.data.role,
            };

            localStorage.setItem(
                "auth",
                JSON.stringify({ ...userData })
            );

            setTokenInCookies(userData.token);
            setUserInfo(userData);

            // if (userData.role === "ADMIN") {
            //     router.push("/dashboard");
            // }
            router.push("/dashboard");

        } catch (error) {
            onError(error.response?.data?.message || "An error occurred");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setUserInfo(INITIAL_AUTH_STATE);
        delete api.defaults.headers.common["Authorization"];
        removeTokenFromCookies();
        router.push("/auth/sign-in");
    };

    return (
        <AuthContext.Provider
            value={{
                userInfo,
                isLogin: !!userInfo.token,
                login: handleLogin,
                logout: handleLogout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

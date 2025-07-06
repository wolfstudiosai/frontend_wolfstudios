'use client'

import { Button, CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react"
import { useState } from "react";

export default function SocialLogin({ provider, children, type, style }) {
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        if (!provider) return;
        try {
            setLoading(true);
            await signIn(provider, {
                redirectTo: '/'
            });
        } catch (error) {
            console.log("error", error)
        } finally {
            localStorage.setItem("hello", "hello");
            localStorage.setItem("socialButton", type);
            setLoading(false);
        }
    }


    return (
        <Button
            fullWidth
            onClick={handleSignIn}
            sx={{ bgcolor: "transparent", border: '1px solid var(--mui-palette-divider)', gap: 2, ...style }}
            disabled={loading}
        >
            {loading ? <CircularProgress size={20} color="inherit" /> : children}
        </Button>
    )
}
'use client'

import { Button } from "@mui/material";
import { signIn } from "next-auth/react"
import { useState } from "react";

export default function SocialLogin({ provider, children, type, style }) {
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        try {
            setLoading(true);
            localStorage.setItem("socialButton", type);
            await signIn(provider);
        } catch (error) {
            console.log("error", error)
        } finally {
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
            {loading ? "Loading..." : children}
        </Button>
    )
}
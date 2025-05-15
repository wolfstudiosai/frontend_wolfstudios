'use client'

import { Button } from "@mui/material";
import { signIn, signOut } from "/src/lib/auth/auth-client"
import { useState } from "react";

export default function SocialLogin({ provider, children, style }) {
    const [loading, setLoading] = useState(false);
    const handleSignIn = async () => {
        try {
            setLoading(true);
            await signIn.social({
                provider: provider,
                callbackUrl: "/dashboard",
            }, {
                onSuccess: (data) => {
                    console.log("data", data)
                },
                onError: (error) => {
                    console.log("error", error)
                }
            });
        } catch (error) {
            console.log("error", error)
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        await signOut({
            fetchOptions: {
                onSuccess: (data) => {
                    console.log("success", data)
                },
                onError: (error) => {
                    console.log("error", error)
                }
            }
        });
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
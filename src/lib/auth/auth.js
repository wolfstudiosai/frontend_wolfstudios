import { betterAuth } from "better-auth"

export const auth = betterAuth({
    socialProviders: {
        facebook: {
            clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
            clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET,
        },
        google: {
            prompt: "select_account",
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        },
    },
})
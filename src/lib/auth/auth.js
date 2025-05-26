import NextAuth from "next-auth"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        {
            id: 'google',
            name: 'Google',
            type: 'oauth',
            issuer: 'https://accounts.google.com',
            authorization: {
                url: 'https://accounts.google.com/o/oauth2/v2/auth',
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            },
            token: 'https://oauth2.googleapis.com/token',
            userinfo: 'https://www.googleapis.com/oauth2/v3/userinfo',

            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    given_name: profile.given_name,
                    family_name: profile.family_name,
                    locale: profile.locale,
                }
            }
        },
        {
            id: 'facebook',
            name: 'Facebook',
            type: 'oauth',
            issuer: 'https://www.facebook.com',
            authorization: {
                url: 'https://www.facebook.com/v12.0/dialog/oauth',
                params: {
                    response_type: 'code',
                    scope: 'email,public_profile',
                },
            },
            token: 'https://graph.facebook.com/v12.0/oauth/access_token',
            userinfo: 'https://graph.facebook.com/me?fields=id,name,email,picture{url}',

            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture?.data?.url,
                }
            },
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        }
    ],

    callbacks: {
        async jwt({ token, profile }) {
            if (profile) {
                token.id = profile.sub || profile.id
                token.name = profile.name
                token.email = profile.email
                token.image = profile.picture?.data?.url || profile.picture
                token.given_name = profile.given_name || null
                token.family_name = profile.family_name || null
                token.locale = profile.locale || null
            }
            return token
        },

        async session({ session, token }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
            session.user.image = token.image
            session.user.given_name = token.given_name
            session.user.family_name = token.family_name
            session.user.locale = token.locale
            return session
        }
    },

    debug: true
})

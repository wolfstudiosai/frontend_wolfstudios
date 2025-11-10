import { NextResponse } from "next/server";

export default function middleware(req) {
    const token = req.cookies.get("accessToken")?.value || "";

    const publicRoute = ["/", "/auth/sign-in", "/auth/sign-up"];

    if (!publicRoute.includes(req.nextUrl.pathname) && !token) {
        return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
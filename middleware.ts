import { NextRequest, NextResponse } from "next/server"
import { isRouteMatch } from "./utils/routes.utils";
import { PROTECTED_ROUTES, PUBLIC_ROUTES } from "./constants/routes.constants";


export const middleware = (req: NextRequest) => {
    const token = req.cookies.get("srdAT")?.value;
    const pathname = req.nextUrl.pathname;

    const isPublic    = isRouteMatch(pathname, PUBLIC_ROUTES);
    const isProtected = isRouteMatch(pathname, PROTECTED_ROUTES);

    //No token -> block protected routes
    if(!token && isProtected){
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    //Token exists -> block public auth pages
    if(token && isPublic){
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
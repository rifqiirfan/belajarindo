import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { validateToken } from "./core/utilities/authUtils";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|view|login|public|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const excludedPaths = ["/not-found"];
  const { pathname } = req.nextUrl;

  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // if (preventUrl.includes(pathname)) {
  //   return NextResponse.rewrite(new URL("/not-found", req.url));
  // }

  try {
    const jwt = req.cookies.get('session')?.value || "";
    const payload = await validateToken(jwt);

    if (pathname === "/" && payload) {
      return NextResponse.rewrite(new URL("/dashboard/achievement", req.url));
    }

    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('authorization', `Bearer ${jwt}`)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } 
  catch (e: any) {
    console.info(e);

    if (pathname !== "/log-in") {
      const response = NextResponse.redirect(new URL('/log-in', req.url));
      response.cookies.delete("session");
      return response;
    }

    return NextResponse.next();
  }
}
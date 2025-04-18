import { NextRequest, NextResponse } from "next/server";
import { Routes, routesInfo } from "./constants/routes";
import { auth } from "./app/api/auth/auth";
import { checkPermissions } from "./constants/permissions";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname as Routes;
  const session = await auth();

  if (!session && pathname.includes(Routes.ADMIN)) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  if (
    routesInfo?.[pathname] &&
    session?.user &&
    !checkPermissions(routesInfo[pathname].permissions, session?.user?.role)
  ) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher:
    "/((?!api|login|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};

import { NextRequest, NextResponse } from "next/server";
import { Routes, routesInfo } from "./constants/routes";
import { auth } from "./app/api/auth/auth";
import { validateExp } from "./utils/validateExp";
import { checkPermissions } from "./constants/permissions";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname as Routes;
  const session = await auth();

  if (routesInfo?.[pathname] && (!session || !validateExp(session.expires))) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url));
  }

  if (
    routesInfo?.[pathname] &&
    session?.user &&
    !checkPermissions(routesInfo[pathname].permissions, session?.user?.role)
  ) {
    return NextResponse.redirect(new URL(Routes.HOME, request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};

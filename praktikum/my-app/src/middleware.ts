import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = request.cookies.get("isLogin")?.value === "true";

  if (isLogin) return NextResponse.next();

  return NextResponse.redirect(new URL("/login", request.url));

  //return NextResponse.redirect(new URL("/", request.url));
  //return NextResponse.next();
}

export const config = {
  matcher: ["/produk/:path*", "/about/:path*"],
};
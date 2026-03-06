import { NextResponse } from "next/server";

export function middleware(request) {

  const { pathname } = request.nextUrl;

  // allow admin login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // protect admin routes
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}
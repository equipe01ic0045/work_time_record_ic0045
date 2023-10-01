import { NextRequest, NextResponse } from "next/server";

export default function middleware(
  request: NextRequest,
  response: NextResponse
) {
  const cookies = request.cookies.get("token");

  if (cookies) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect("http://localhost:4400/auth");
  }
}

export const config = {
  matcher: ["/main/:path*"],
};

import { NextRequest, NextResponse } from "next/server";

export default async function middleware(
  request: NextRequest,
  response: NextResponse
) {


  if (!request.cookies.get('token')?.value) {
    return NextResponse.redirect('http://localhost:4400/auth/')
  }

  const fetchParameters = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': `token=${request.cookies.get('token')?.value}`
    },
  }

  fetch('http://localhost:5000/auth/cookie', fetchParameters)
    .then((response) => {

      if (response.status === 201) {
        return NextResponse.next()
      }
      if (response.status === 401) {
        return NextResponse.redirect('http://localhost:4400/auth/')
      }
      else {
        return NextResponse.redirect('http://localhost:4400/auth/')
      }
    })
    .catch((error) => {
      return NextResponse.redirect('http://localhost:4400/auth/')
    })
}



export const config = {
  matcher: ["/main/:path*"],
};

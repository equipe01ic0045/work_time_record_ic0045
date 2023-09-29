// import { NextResponse, NextRequest } from 'next/server'

import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest, response : NextResponse) {

  const path = request.nextUrl.pathname // "/route/structure"
  const cookies =  request.cookies.get('token')

    if(cookies){
      return NextResponse.next()
    }
    if(!cookies){
      return NextResponse.redirect('http://localhost:4400/')
    }
}


// export default function middleware(request: NextRequest){
//   console.log('middleware')
//   console.log('url :',request.url)
//   console.log('next url :', request.nextUrl)
// }

export const config = {
  matcher : ['/main/:path*']
}
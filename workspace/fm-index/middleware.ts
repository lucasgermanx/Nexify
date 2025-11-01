import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import authController from './core/server/controllers/auth.controller';

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("fm_token")?.value;
    
  if(!jwtToken){
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  const data = await authController.GetDataUser(jwtToken) as any;

  if (data?.failed == true){
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
 
export const config = {
  matcher: '/checkout/:path*',
}
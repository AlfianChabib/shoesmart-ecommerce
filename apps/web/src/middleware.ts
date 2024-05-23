import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(requset: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, errors } from 'jose';

const jwtSecret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET_TOKEN as string);

export async function middleware(request: NextRequest) {
  // const accessToken = request.cookies.get('accessToken');
  // if (!accessToken) {
  //   const response = NextResponse.next();
  //   response.cookies.delete('refreshToken');
  //   return response;
  // } else {
  //   try {
  //     const response = NextResponse.next();
  //     request.headers.set('authorization', `Bearer ${accessToken.value}`);
  //     await jwtVerify(accessToken.value, jwtSecret);
  //     return response;
  //   } catch (error) {
  //     if (error instanceof errors.JWTClaimValidationFailed) {
  //       if (error.name === 'JWTExpired') {
  //         const refreshToken = request.cookies.get('refreshToken');
  //         if (!refreshToken) {
  //           const response = NextResponse.next();
  //           response.cookies.delete('accessToken');
  //           response.cookies.delete('refreshToken');
  //           return response;
  //         } else {
  //           const headers = new Headers({
  //             'Content-Type': 'application/json',
  //             Cookie: `${refreshToken.name}=${refreshToken.value}; `,
  //           });
  //           const responseAccessToken = await fetch('http://localhost:8000/api/auth/refresh', {
  //             credentials: 'include',
  //             headers,
  //           });
  //           const resJson = await responseAccessToken.json();
  //           if (resJson.success) {
  //             const response = NextResponse.next();
  //             response.cookies.set({
  //               name: 'accessToken',
  //               value: resJson.accessToken,
  //               maxAge: 24 * 60 * 60,
  //               httpOnly: true,
  //             });
  //             request.headers.set('authorization', `Bearer ${resJson.accessToken}`);
  //             return response;
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

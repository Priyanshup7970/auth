import { NextResponse, NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    // another way to write it for long list of paths but less efficient for small list
    //const isPublicPath = ['/login', '/signup'].includes(path);
    const isPublicPath = path === '/login' || path === '/signup';
    const token = request.cookies.get('token')?.value;
    // if no token and not public path, redirect to login first method but less efficient
    // if (!token && !isPublicPath) {
    //     const url = request.nextUrl.clone();
    //     url.pathname = '/login';
    //     return NextResponse.redirect(url);
    // }
    if (!token && !isPublicPath) { 
    return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
    // if token and public path, redirect to home
    if (token && isPublicPath) { 
    return NextResponse.redirect(new URL('/', request.nextUrl))
    }  
    
    return NextResponse.next();
}
 
export const config = {
  matcher: [
    '/',
    '/profile',
    'login',
    '/signup',
]
}
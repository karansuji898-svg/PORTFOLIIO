import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  
  // Check if trying to access admin dashboard or mutating API
  const isAdminRoute = url.pathname.startsWith('/admin');
  const isMutatingApi = (url.pathname === '/api/portfolio' || url.pathname === '/api/cloudinary-signature') && request.method === 'POST';

  if (isAdminRoute || isMutatingApi) {
    // Check for auth cookie
    const authCookie = request.cookies.get('portfolio_admin_auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      if (isMutatingApi) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      } else {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/portfolio', '/api/cloudinary-signature'],
};

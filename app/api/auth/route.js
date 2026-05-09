import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    // Read from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin password not configured on server.' }, { status: 500 });
    }

    if (password === adminPassword) {
      // Set secure HttpOnly cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'portfolio_admin_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
      return response;
    } else {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

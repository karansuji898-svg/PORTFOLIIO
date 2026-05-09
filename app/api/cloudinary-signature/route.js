import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const { paramsToSign } = await request.json();
    
    // Check if the user is authenticated (simple check for now, can be improved)
    const authCookie = request.cookies.get('portfolio_admin_auth');
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({ signature });
  } catch (error) {
    console.error('Signature error:', error);
    return NextResponse.json({ error: 'Failed to sign request' }, { status: 500 });
  }
}

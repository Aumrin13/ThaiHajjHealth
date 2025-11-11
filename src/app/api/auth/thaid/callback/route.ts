import { NextRequest, NextResponse } from 'next/server';

interface ThaiDTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface ThaiDUserInfo {
  sub: string; // Citizen ID 13 หลัก
  name: string;
  given_name: string;
  family_name: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;
  birthdate?: string;
  gender?: string;
  address?: {
    formatted: string;
    street_address?: string;
    locality?: string;
    region?: string;
    postal_code?: string;
    country?: string;
  };
}

// Validate Citizen ID checksum
function validateCitizenId(citizenId: string): boolean {
  const citizenIdRegex = /^[1-8]\d{12}$/;
  
  if (!citizenIdRegex.test(citizenId)) {
    return false;
  }

  const digits = citizenId.split('').map(Number);
  const checksum = digits.slice(0, 12).reduce((sum, digit, index) => {
    return sum + (digit * (13 - index));
  }, 0);
  
  const lastDigit = (11 - (checksum % 11)) % 10;
  
  return lastDigit === digits[12];
}

export async function POST(request: NextRequest) {
  try {
    const { code, redirect_uri } = await request.json();

    if (!code) {
      return NextResponse.json({
        success: false,
        message: 'Authorization code is required'
      }, { status: 400 });
    }

    // 1. Exchange code for access token
    const tokenResponse = await fetch(process.env.NEXT_PUBLIC_THAID_TOKEN_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.NEXT_PUBLIC_THAID_CLIENT_ID!,
        client_secret: process.env.THAID_CLIENT_SECRET!,
        code,
        redirect_uri: redirect_uri || process.env.NEXT_PUBLIC_THAID_REDIRECT_URI!,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange error:', errorData);
      return NextResponse.json({
        success: false,
        message: 'Failed to exchange authorization code'
      }, { status: 400 });
    }

    const tokenData: ThaiDTokenResponse = await tokenResponse.json();

    // 2. Get user info from ThaiD
    const userInfoResponse = await fetch(process.env.NEXT_PUBLIC_THAID_USERINFO_URL!, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userInfoResponse.ok) {
      const errorData = await userInfoResponse.text();
      console.error('User info error:', errorData);
      return NextResponse.json({
        success: false,
        message: 'Failed to get user information'
      }, { status: 400 });
    }

    const userInfo: ThaiDUserInfo = await userInfoResponse.json();

    // 3. Validate citizen ID
    if (!validateCitizenId(userInfo.sub)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid citizen ID format'
      }, { status: 400 });
    }

    // 4. In a real application, you would:
    // - Check if user exists in database by citizen_id
    // - Create new user if doesn't exist
    // - Update existing user info
    // - Generate JWT token
    // - Store ThaiD token for future API calls

    // For now, we'll simulate this process
    const mockUser = {
      id: 'mock-user-id',
      citizenId: userInfo.sub,
      name: userInfo.name,
      email: userInfo.email,
      role: 'staff', // You would determine this based on your business logic
      loginMethod: 'thaid',
      thaidVerified: true
    };

    // Generate mock JWT token (in real app, use proper JWT library)
    const mockJwtToken = `mock.jwt.token.${Date.now()}`;

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: mockUser,
        token: {
          accessToken: mockJwtToken,
          expiresIn: 24 * 60 * 60 // 24 hours
        }
      }
    });

  } catch (error) {
    console.error('ThaiD callback error:', error);
    return NextResponse.json({
      success: false,
      message: 'Authentication failed'
    }, { status: 500 });
  }
}
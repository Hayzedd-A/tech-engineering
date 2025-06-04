import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const tokenFromHeader = authHeader?.replace('Bearer ', '');
  const tokenFromCookie = req.cookies.get('admin-token')?.value;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return NextResponse.json({ valid: false, reason: "No token provided" }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ valid: false, reason: "Invalid token" }, { status: 401 });
  }
}


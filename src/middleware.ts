import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function verifyJWT(token: string): Promise<boolean> {
  try {
    // Convert secret to Uint8Array for jose
    const secret = new TextEncoder().encode(JWT_SECRET);

    // Verify the JWT token
    const { payload } = await jwtVerify(token, secret);

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for admin routes
  if (pathname.startsWith("/admin")) {
    // Allow access to login page
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for authentication token
    const token = request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const isValid = await verifyJWT(token);
    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Check if the request is for admin API routes
  if (pathname.startsWith("/api/admin")) {
    const token =
      request.headers.get("authorization")?.replace("Bearer ", "") ||
      request.cookies.get("admin-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const isValid = await verifyJWT(token);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

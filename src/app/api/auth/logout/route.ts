import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response
    console.log("logging out")
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Clear the admin-token cookie
    // response.cookies.set("admin-token", "", {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 0, // Expire immediately
    //   path: "/",
    // });

    response.cookies.delete('admin-token')

    return response;
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}

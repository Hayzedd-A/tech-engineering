// File: /pages/api/admin/verify/route.ts

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export default function GET(req: NextApiRequest) {
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.cookies["admin-token"];
    console.log(token)

  if (!token) {
    return NextResponse.json({ valid: false, reason: "No token provided" }, {status: 401});
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ valid: true }, {status: 200});
  } catch (err) {
    console.error(err)
    return NextResponse.json({ valid: false, reason: "Invalid token" }, {status: 401});
  }
}

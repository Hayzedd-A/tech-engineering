import { NextRequest, NextResponse } from "next/server";
import { getServices, createService } from "@/lib/database/services";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const result = await getServices({ page, limit, search });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const serviceData = await request.json();

    if (!serviceData.name || !serviceData.price) {
      return NextResponse.json(
        { success: false, error: "Name and price are required" },
        { status: 400 }
      );
    }

    const service = await createService(serviceData);

    return NextResponse.json({
      success: true,
      data: service,
      message: "Service created successfully",
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to create service" },
      { status: 500 }
    );
  }
}

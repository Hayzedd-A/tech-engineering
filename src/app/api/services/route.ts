import { NextRequest, NextResponse } from "next/server";
import { getServices } from "@/lib/database/services";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const available = searchParams.get("available");
    const featured = searchParams.get("featured");
    const category = searchParams.get("category");

    // Build filter object
    const filters: any = {};

    if (available !== null) {
      filters.available = available === "true";
    }

    if (featured !== null) {
      filters.featured = featured === "true";
    }

    if (category) {
      filters.category = category;
    }

    // Get services with filters and pagination
    const result = await getServices({
      page,
      limit,
      search,
      filters,
    });
    if (!result) {
      throw new Error("Error getting services");
    }
    if (result instanceof Error) {
      throw new Error("Result is error:", result);
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
      message: "Services retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching services:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch services",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

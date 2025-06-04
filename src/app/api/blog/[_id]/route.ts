import { NextRequest, NextResponse } from "next/server";
import { getBlogPostById } from "@/lib/database/blog";

interface RouteParams {
  params: {
    _id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { _id } = params;

    // Validate ID parameter
    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog post ID is required",
        },
        { status: 400 }
      );
    }

    // Get service by ID
    const blog = await getBlogPostById(_id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog,
      message: "Blog retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching service:", error);

    // Handle specific MongoDB errors
    if (
      error instanceof Error &&
      error.message.includes("Cast to ObjectId failed")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog post ID format",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServiceById } from "@/lib/database/services";

// interface RouteParams {
//   params: {
//     _id: string;
//   };
// }


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ _id: string }> }
) {
  try {
    const { _id } = await context.params;

    // Validate ID parameter
    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Service ID is required",
        },
        { status: 400 }
      );
    }

    // Get service by ID
    const service = await getServiceById(_id);

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          message: "Service not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service,
      message: "Service retrieved successfully",
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
          message: "Invalid service ID format",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch service",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

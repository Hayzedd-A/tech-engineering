import { NextRequest, NextResponse } from "next/server";
// import { Product, ApiResponse, PaginatedResponse } from "@/lib/types";
import {
  getProducts,
  createProduct,
  // updateProduct,
  // deleteProduct,
} from "@/lib/database/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const result = await getProducts({ page, limit, search, category });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const productData = await request.json();

    // Validate required fields
    if (!productData.name || !productData.price) {
      return NextResponse.json(
        { success: false, error: "Name and price are required" },
        { status: 400 }
      );
    }

    const product = await createProduct(productData);

    return NextResponse.json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/database/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const featured = searchParams.get("featured") === "true" ? true : undefined;

    // Only show products that are in stock for public API
    const result = await getProducts({
      page,
      limit,
      search,
      category,
      featured,
    });

    // Filter to only show in-stock products
    const inStockProducts = result.data.filter((product) => product.inStock);

    return NextResponse.json({
      success: true,
      data: inStockProducts,
      pagination: {
        ...result.pagination,
        total: inStockProducts.length,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

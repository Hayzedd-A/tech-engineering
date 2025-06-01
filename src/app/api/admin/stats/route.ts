import { NextResponse } from "next/server";
import { getProductCount } from "@/lib/database/products";
import { getServiceCount } from "@/lib/database/services";
import { getBlogPostCount } from "@/lib/database/blog";
import { getTestimonialCount } from "@/lib/database/testimonials";

export async function GET() {
  try {
    const [totalProducts, totalServices, totalBlogPosts, totalTestimonials] =
      await Promise.all([
        getProductCount(),
        getServiceCount(),
        getBlogPostCount(),
        getTestimonialCount(),
      ]);

    const stats = {
      totalProducts,
      totalServices,
      totalBlogPosts,
      totalTestimonials,
      recentOrders: 24,
      monthlyRevenue: 15420,
    };

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}

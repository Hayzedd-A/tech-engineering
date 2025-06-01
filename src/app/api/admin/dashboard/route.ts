import { NextRequest, NextResponse } from "next/server";
import { AdminStats } from "@/lib/types";
import { getProductCount } from "@/lib/database/products";
import { getServiceCount } from "@/lib/database/services";
import { getBlogPostCount } from "@/lib/database/blog";
import { getTestimonialCount } from "@/lib/database/testimonials";

export async function GET() {
  try {
    const stats: AdminStats = {
      totalProducts: await getProductCount(),
      totalServices: await getServiceCount(),
      totalBlogPosts: await getBlogPostCount(),
      totalTestimonials: await getTestimonialCount(),
      recentOrders: 0, // Implement based on your order system
      monthlyRevenue: 0, // Implement based on your order system
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

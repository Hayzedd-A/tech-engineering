import { NextRequest, NextResponse } from "next/server";
import { getBlogPosts, createBlogPost } from "@/lib/database/blog";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const published = searchParams.get("published");

    const result = await getBlogPosts({
      page,
      limit,
      search,
      published: published ? published === "true" : undefined,
    });

    return NextResponse.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const blogData = await request.json();

    if (!blogData.title || !blogData.content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required" },
        { status: 400 }
      );
    }

    const blogPost = await createBlogPost(blogData);

    return NextResponse.json({
      success: true,
      data: blogPost,
      message: "Blog post created successfully",
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

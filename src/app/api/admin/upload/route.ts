import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, access } from "fs/promises";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const folder = (data.get("folder") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file type. Only JPEG, PNG, and WebP are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: "File size too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads", folder);
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${timestamp}_${originalName}`;
    const filepath = join(uploadsDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "No image URL provided" },
        { status: 400 }
      );
    }

    // Extract filename from URL
    // Expected format: /uploads/filename.ext
    const urlParts = imageUrl.split("/");
    const filename = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2]

    if (!filename || !filename.includes(".")) {
      return NextResponse.json(
        { success: false, error: "Invalid image URL format" },
        { status: 400 }
      );
    }

    // Security check: ensure the file is in the uploads directory
    if (
      filename.includes("..") ||
      filename.includes("/") ||
      filename.includes("\\")
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid filename" },
        { status: 400 }
      );
    }

    const filepath = join(process.cwd(), "public", "uploads", folder, filename);

    // Check if file exists
    try {
      await access(filepath);
    } catch (error) {
      console.error(error)
      return NextResponse.json(
        { success: false, error: "File not found" },
        { status: 404 }
      );
    }

    // Delete the file
    await unlink(filepath);

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete image" },
      { status: 500 }
    );
  }
}

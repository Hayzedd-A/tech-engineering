import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";

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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const path = join(process.cwd(), "public", "images", folder, filename);

    await writeFile(path, buffer);

    const imageUrl = `/images/${folder}/${filename}`;

    return NextResponse.json({
      success: true,
      data: { url: imageUrl },
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

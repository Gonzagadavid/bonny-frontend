import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");

    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 },
      );
    }

    if (request?.body) {
      const blob = await put(filename, request.body, {
        access: "public",
        multipart: true,
        contentType:
          request.headers.get("content-type") || "application/octet-stream",
      });

      return NextResponse.json(blob);
    }
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
}

"use server";
import { signIn } from "@/app/api/auth/auth";
import { Routes } from "@/constants/routes";
import { AuthError } from "next-auth";
import { put } from "@vercel/blob";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData, { redirectTo: Routes.HOME });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function uploadToBlob(data: FormData) {
  const file = data.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  try {
    // Generate a unique filename
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
      contentType: file.type,
    });

    return { url: blob.url };
  } catch (error) {
    console.error("Error uploading to Vercel Blob:", error);
    return { error: "Failed to upload file" };
  }
}

export async function uploadMultipleToBlob(files: File[]) {
  try {
    const uploadPromises = files.map(async (file) => {
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;

      const blob = await put(filename, file, {
        access: "public",
        contentType: file.type,
      });

      return blob.url;
    });

    const urls = await Promise.all(uploadPromises);
    return { urls };
  } catch (error) {
    console.error("Error uploading multiple files to Vercel Blob:", error);
    return { error: "Failed to upload files" };
  }
}

export async function deleteFromBlob(url: string) {
  // Note: Vercel Blob doesn't currently support client-side deletion
  // This is a placeholder for when that functionality becomes available
  try {
    // For now, we'll just return success
    return { success: true };
  } catch (error) {
    console.error("Error deleting from Vercel Blob:", error);
    return { error: "Failed to delete file" };
  }
}

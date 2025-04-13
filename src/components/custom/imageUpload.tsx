"use client";

import React, { useCallback, useState, useTransition } from "react";
import type { FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { X, Upload, Loader2, Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadMultipleToBlob } from "@/lib/actions";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value = [],
  onChange,
  onRemove,
  maxFiles = 10,
  className,
  disabled = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; preview: string }[]
  >([]);
  const [isPending, startTransition] = useTransition();

  const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    // Create previews for the files
    const previews = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviewFiles(previews);
  }, []);

  const uploadFiles = async () => {
    if (previewFiles.length === 0) return;

    setIsUploading(true);

    startTransition(async () => {
      try {
        const result = await uploadMultipleToBlob(
          previewFiles.map((p) => p.file),
        );

        if (result.error) {
          toast({
            title: "Upload failed",
            description: result.error,
            variant: "destructive",
          });
        } else if (result.urls) {
          onChange([...value, ...result.urls]);
          toast({
            title: "Upload successful",
            description: `${result.urls.length} ${result.urls.length === 1 ? "file" : "files"} uploaded`,
          });

          // Clean up previews
          previewFiles.forEach((p) => URL.revokeObjectURL(p.preview));
          setPreviewFiles([]);
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast({
          title: "Upload failed",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    });
  };

  const removePreviewFile = (index: number) => {
    const newPreviews = [...previewFiles];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index].preview);
    newPreviews.splice(index, 1);
    setPreviewFiles(newPreviews);
  };

  const cancelAllPreviews = () => {
    // Revoke all object URLs
    previewFiles.forEach((p) => URL.revokeObjectURL(p.preview));
    setPreviewFiles([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles,
    disabled: isUploading || disabled || value.length >= maxFiles || isPending,
  });

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previewFiles.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [previewFiles]);

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-3">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-24 w-24 overflow-hidden rounded-md"
          >
            <div className="absolute right-1 top-1 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-5 w-5 rounded-full"
                onClick={() => onRemove(url)}
                disabled={disabled || isPending}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Uploaded image"
              src={url || "/placeholder.svg"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

      {previewFiles.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {previewFiles.map((file, index) => (
              <div
                key={index}
                className="relative h-24 overflow-hidden rounded-md"
              >
                <div className="absolute right-1 top-1 z-10">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-5 w-5 rounded-full"
                    onClick={() => removePreviewFile(index)}
                    disabled={isUploading || isPending}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                <Image
                  fill
                  className="object-cover"
                  alt={`Preview ${index}`}
                  src={file.preview || "/placeholder.svg"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={cancelAllPreviews}
              disabled={isUploading || isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={uploadFiles}
              disabled={isUploading || isPending}
            >
              {isUploading || isPending ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-3 w-3" />
                  Upload {previewFiles.length}{" "}
                  {previewFiles.length === 1 ? "file" : "files"}
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            "relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition hover:bg-muted/50",
            isDragActive && "bg-muted/50",
            (disabled || isPending) && "cursor-not-allowed opacity-50",
          )}
        >
          <input {...getInputProps()} />
          {isUploading || isPending ? (
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">
                  Drag & drop or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  Upload up to {maxFiles} images (max 4MB each)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

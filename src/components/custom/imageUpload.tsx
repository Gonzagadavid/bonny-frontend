"use client";

import { useCallback, useState, useEffect } from "react";
import type { FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormDescription } from "@/components/ui/form";

interface ImageUploadProps {
  value: string[];
  onRemove: (url: string) => void;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
  disabled?: boolean;
}

export function ImageUpload({
  value = [],
  onRemove,
  onFilesChange,
  maxFiles = 10,
  className,
  disabled = false,
}: ImageUploadProps) {
  const [previewFiles, setPreviewFiles] = useState<
    { file: File; preview: string }[]
  >([]);

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      // Limit the number of files
      const remainingSlots = maxFiles - value.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      if (filesToAdd.length === 0) return;

      // Create previews for the files
      const newPreviews = filesToAdd.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setPreviewFiles((prev) => [...prev, ...newPreviews]);

      // Pass files to parent component
      if (onFilesChange) {
        onFilesChange([...previewFiles.map((p) => p.file), ...filesToAdd]);
      }
    },
    [maxFiles, onFilesChange, previewFiles, value.length],
  );

  const removePreviewFile = (index: number) => {
    const newPreviews = [...previewFiles];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index].preview);
    newPreviews.splice(index, 1);
    setPreviewFiles(newPreviews);

    // Pass updated files to parent component
    if (onFilesChange) {
      onFilesChange(newPreviews.map((p) => p.file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: maxFiles - value.length - previewFiles.length,
    disabled: disabled || value.length + previewFiles.length >= maxFiles,
  });

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewFiles.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [previewFiles]);

  return (
    <div className={className}>
      <div className="mb-4 flex flex-wrap gap-3">
        {/* Already uploaded images */}
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
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Imagem enviada"
              src={url || "/placeholder.svg"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}

        {/* Preview images (selected but not yet uploaded) */}
        {previewFiles.map((file, index) => (
          <div
            key={index}
            className="relative h-24 w-24 overflow-hidden rounded-md"
          >
            <div className="absolute right-1 top-1 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="h-5 w-5 rounded-full"
                onClick={() => removePreviewFile(index)}
                disabled={disabled}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="absolute inset-0 bg-amber-100/20 flex items-center justify-center">
              <div className="absolute inset-0">
                <Image
                  fill
                  className="object-cover"
                  alt={`Preview ${index}`}
                  src={file.preview || "/placeholder.svg"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[8px] text-center py-1">
                Pendente
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        {...getRootProps()}
        className={cn(
          "relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center rounded-md border border-dashed p-4 transition hover:bg-muted/50",
          isDragActive && "bg-muted/50",
          disabled || value.length + previewFiles.length >= maxFiles
            ? "cursor-not-allowed opacity-50"
            : "",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <Upload className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">
              Arraste e solte ou clique para selecionar
            </p>
            <p className="text-xs text-muted-foreground">
              Selecione até {maxFiles} imagens (máx. 4MB cada)
            </p>
          </div>
        </div>
      </div>

      <FormDescription className="text-center text-xs mt-2">
        As imagens serão enviadas quando o formulário for submetido
      </FormDescription>

      {previewFiles.length > 0 && (
        <div className="mt-2 text-sm text-amber-600">
          {previewFiles.length}{" "}
          {previewFiles.length === 1
            ? "imagem selecionada"
            : "imagens selecionadas"}{" "}
          para envio
        </div>
      )}
    </div>
  );
}

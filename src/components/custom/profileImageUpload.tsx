"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FormDescription } from "@/components/ui/form";

interface ProfileImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onFileChange?: (file: File | null) => void;
  className?: string;
  disabled?: boolean;
}

export function ProfileImageUpload({
  value,
  onFileChange,
  className,
  disabled = false,
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [_, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (value) {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 4 * 1024 * 1024) {
      alert(
        "Arquivo muito grande. Por favor, selecione uma imagem com menos de 4MB.",
      );
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    setFile(selectedFile);

    if (onFileChange) {
      onFileChange(selectedFile);
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  };

  const cancelPreview = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    setFile(null);
    if (onFileChange) {
      onFileChange(null);
    }
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <Avatar className="w-[200px] h-[200px]">
        <AvatarImage
          src={preview || value || "/placeholder.svg"}
          alt="Imagem de perfil"
        />
      </Avatar>

      {preview ? (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={cancelPreview}
            disabled={disabled}
          >
            <X className="mr-2 h-3 w-3" />
            Cancelar
          </Button>
        </div>
      ) : (
        <div className="flex items-center">
          <Input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
            disabled={disabled}
            className="max-w-[250px]"
          />
        </div>
      )}

      <FormDescription className="text-center text-xs">
        A imagem será enviada quando o formulário for submetido
      </FormDescription>
    </div>
  );
}

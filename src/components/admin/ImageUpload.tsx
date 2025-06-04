"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Trash2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  accept?: string;
  folder: string;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  label = "Upload Image",
  accept = "image/*",
  folder = "general",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch(`/api/admin/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onChange(result.url);
      } else {
        alert(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = async () => {
    if (!value) return;

    setDeleting(true);
    try {
      const response = await fetch(
        `/api/admin/upload?url=${encodeURIComponent(value)}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        onChange("");
        if (onRemove) {
          onRemove();
        }
      } else {
        alert(result.error || "Delete failed");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  // const handleRemove = () => {
  //   onChange("");
  //   if (onRemove) {
  //     onRemove();
  //   }
  // };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {value ? (
        <div className="relative">
          <div className="relative w-full h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>{
                handleDelete();
                fileInputRef.current?.click()}
              } 
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Replace
            </Button>
            {/* <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemove}
              disabled={uploading || deleting}
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button> */}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={uploading || deleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {deleting ? "Deleting..." : "Delete File"}
            </Button>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-sm text-gray-600">
              {uploading ? "Uploading..." : "Click to upload image"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, WebP up to 5MB
            </p>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading}
      />
    </div>
  );
}

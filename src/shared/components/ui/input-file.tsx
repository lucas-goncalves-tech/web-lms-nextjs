"use client";

import * as React from "react";
import { Upload, X, FileIcon, LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface InputFileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  label?: string;
  icon?: LucideIcon;
  onFileChange?: (file: File | null) => void;
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    { className, label, icon, id, onChange, onFileChange, accept, ...props },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    const IconComponent = icon || Upload;

    const handleFileChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
        onFileChange?.(file);
        onChange?.(e);
      },
      [onChange, onFileChange]
    );

    const handleRemoveFile = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        onFileChange?.(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      [onFileChange]
    );

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    }, []);

    const handleDragLeave = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0] || null;
        if (file) {
          setSelectedFile(file);
          onFileChange?.(file);
          // Update the input element
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          if (inputRef.current) {
            inputRef.current.files = dataTransfer.files;
          }
        }
      },
      [onFileChange]
    );

    const handleClick = React.useCallback(() => {
      inputRef.current?.click();
    }, []);

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block pb-2 text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "group relative flex min-h-12 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-sm border border-input bg-background/50 px-4 py-3 text-base text-foreground transition-all duration-200",
            "hover:border-primary/50 hover:bg-background/70",
            "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/50",
            isDragging && "border-primary bg-primary/5 ring-2 ring-primary/50",
            className
          )}
        >
          <input
            id={id}
            type="file"
            ref={inputRef}
            accept={accept}
            onChange={handleFileChange}
            className="sr-only"
            {...props}
          />

          {selectedFile ? (
            <>
              <div className="shrink-0 text-primary">
                <FileIcon size={20} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-foreground">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="shrink-0 rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remover arquivo"
              >
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <div className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary">
                <IconComponent size={20} />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Clique para selecionar
                  </span>{" "}
                  ou arraste um arquivo
                </span>
                {accept && (
                  <span className="text-xs text-muted-foreground/70">
                    {accept.split(",").join(", ")}
                  </span>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);

InputFile.displayName = "InputFile";

export { InputFile, type InputFileProps };

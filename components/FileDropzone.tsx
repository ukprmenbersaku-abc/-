
import React, { useRef, useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { translations } from '../utils/translations';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  t: typeof translations['ja'];
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFilesSelected, t }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const imageFiles = (Array.from(e.dataTransfer.files) as File[]).filter(file => file.type.startsWith('image/'));
      if (imageFiles.length > 0) onFilesSelected(imageFiles);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = (Array.from(e.target.files) as File[]).filter(file => file.type.startsWith('image/'));
      onFilesSelected(imageFiles);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        w-full p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
        flex flex-col items-center justify-center gap-4 group
        ${isDragging 
          ? 'border-primary bg-primary/10 scale-[1.01]' 
          : 'border-gray-700 bg-surface hover:border-gray-600 hover:bg-surface/80'
        }
      `}
    >
      <input 
        type="file" 
        ref={inputRef} 
        className="hidden" 
        multiple 
        accept="image/*"
        onChange={handleInputChange}
      />
      
      <div className={`p-4 rounded-full bg-dark transition-transform duration-300 group-hover:scale-110 ${isDragging ? 'text-primary' : 'text-gray-400'}`}>
        <UploadCloud className="w-8 h-8" />
      </div>
      
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-200">
          {t.dropzoneTitle}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {t.dropzoneSubtitle}
        </p>
      </div>
    </div>
  );
};

export default FileDropzone;

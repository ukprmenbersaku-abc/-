import React from 'react';
import { Check, AlertCircle, Loader2, X, FileImage, Download } from 'lucide-react';
import { ProcessedFile, ProcessStatus, OutputFormat } from '../types';
import { getExtensionFromMime } from '../services/imageService';
import { translations } from '../utils/translations';

interface FileItemProps {
  item: ProcessedFile;
  targetFormat: OutputFormat;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onDownload: (item: ProcessedFile) => void;
  t: typeof translations['ja'];
}

const FileItem: React.FC<FileItemProps> = ({ 
  item, 
  targetFormat, 
  isSelected,
  onToggleSelect,
  onRemove, 
  onDownload, 
  t 
}) => {
  const getStatusIcon = () => {
    switch (item.status) {
      case ProcessStatus.COMPLETED:
        return <div className="p-1 bg-green-500/20 rounded-full"><Check className="w-4 h-4 text-green-400" /></div>;
      case ProcessStatus.ERROR:
        return <div className="p-1 bg-red-500/20 rounded-full"><AlertCircle className="w-4 h-4 text-red-400" /></div>;
      case ProcessStatus.PROCESSING:
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      default:
        return <div className="p-1 bg-gray-700 rounded-full"><FileImage className="w-4 h-4 text-gray-400" /></div>;
    }
  };

  const finalName = `${item.newName || item.originalFile.name.split('.')[0]}.${getExtensionFromMime(targetFormat)}`;

  return (
    <div className={`relative flex items-center gap-4 p-3 rounded-lg border transition-colors ${isSelected ? 'bg-primary/5 border-primary/30' : 'bg-surface border-gray-700/50 hover:border-gray-600'}`}>
      {/* Checkbox */}
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(item.id)}
          className="w-5 h-5 rounded border-gray-600 bg-dark text-primary focus:ring-primary/50 cursor-pointer accent-primary"
        />
      </div>

      {/* Thumbnail */}
      <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden bg-black/50 border border-gray-800">
        <img 
          src={item.previewUrl} 
          alt="Preview" 
          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" 
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm text-gray-200 truncate" title={finalName}>
            {finalName}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{(item.originalFile.size / 1024).toFixed(1)} KB</span>
          <span>→</span>
          <span className="uppercase">{getExtensionFromMime(targetFormat)}</span>
          
          {item.status === ProcessStatus.ERROR && (
             <span className="text-red-400 ml-2">{item.error}</span>
          )}
        </div>
      </div>

      {/* Status / Actions */}
      <div className="flex items-center gap-3 pl-2 border-l border-gray-700">
        {getStatusIcon()}

        {item.status === ProcessStatus.COMPLETED && (
          <button 
            onClick={() => onDownload(item)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
            title={t.download}
          >
            <Download className="w-4 h-4" />
          </button>
        )}
        
        <button 
          onClick={() => onRemove(item.id)}
          className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
          title={t.remove}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FileItem;
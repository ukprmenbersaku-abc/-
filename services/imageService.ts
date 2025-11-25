import { OutputFormat } from '../types';

export const readFileAsDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const convertImage = async (
  file: File,
  format: OutputFormat,
  quality: number,
  scale: number = 1
): Promise<Blob> => {
  return new Promise(async (resolve, reject) => {
    try {
      const dataUrl = await readFileAsDataURL(file);
      const img = new Image();
      
      img.onload = () => {
        const targetWidth = Math.round(img.width * scale);
        const targetHeight = Math.round(img.height * scale);

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Fill background with white for transparent images if converting to JPEG
        if (format === OutputFormat.JPEG) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Enable high quality image scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Conversion failed'));
            }
          },
          format,
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = dataUrl;
    } catch (e) {
      reject(e);
    }
  });
};

export const getExtensionFromMime = (mime: OutputFormat): string => {
  switch (mime) {
    case OutputFormat.JPEG: return 'jpg';
    case OutputFormat.PNG: return 'png';
    case OutputFormat.WEBP: return 'webp';
    default: return 'jpg';
  }
};
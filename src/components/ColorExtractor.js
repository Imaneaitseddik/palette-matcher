import { useEffect } from 'react';
import ColorThief from 'colorthief';
import { rgbToHex, rgbToHsl } from '../utils/colorUtils';

function ColorExtractor({ 
  imageUrl, 
  onColorsExtracted, 
  colorCount = 5 
}) {
  useEffect(() => {
    // Create a function inside the effect to handle color extraction
    const extractColors = () => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, colorCount);

        const extractedColors = palette.map(([r, g, b]) => ({
          hex: rgbToHex(r, g, b),
          rgb: { r, g, b },
          hsl: rgbToHsl(r, g, b)
        }));

        onColorsExtracted(extractedColors);
      };

      // Add error handling
      img.onerror = () => {
        console.error('Failed to load image');
      };
    };

    // Only extract colors if imageUrl is provided
    if (imageUrl) {
      extractColors();
    }
  }, [imageUrl, onColorsExtracted, colorCount]);

  return null;
}

export default ColorExtractor;
import React from 'react';

function PaletteCustomizer({ palette, onPaletteUpdate }) {
  if (!palette) return null;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Palette Customization</h2>
      <div className="grid grid-cols-5 gap-2">
        {palette.baseColors.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-sm mt-1">{color.hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaletteCustomizer;

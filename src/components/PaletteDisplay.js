import React from 'react';

function PaletteDisplay({ colors, onPaletteTypeSelect }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Extracted Colors</h2>
      <div className="flex space-x-2">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="w-16 h-16 rounded"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg mb-2">Generate Palette</h3>
        <div className="flex space-x-2">
          {['complementary', 'triadic', 'analogous', 'monochromatic'].map((type) => (
            <button
              key={type}
              onClick={() => onPaletteTypeSelect(type)}
              className="bg-blue-500 text-white px-3 py-1 rounded capitalize"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PaletteDisplay;

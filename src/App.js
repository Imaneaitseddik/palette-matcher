import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import './App.css';
import ColorExtractor from './components/ColorExtractor';
import PaletteDisplay from './components/PaletteDisplay';
import PaletteCustomizer from './components/PaletteCustomizer';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedColors, setExtractedColors] = useState([]);
  const [currentPalette, setCurrentPalette] = useState(null);

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl);
  };

  const handleColorExtraction = (colors) => {
    setExtractedColors(colors);
    setCurrentPalette({
      baseColors: colors,
      createdAt: new Date()
    });
  };

  const handlePaletteGeneration = (paletteType) => {
    console.log(`Generating ${paletteType} palette`);
    // Palette generation logic will go here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Art Palette Matcher</h1>
      
      <ImageUploader onImageUpload={handleImageUpload} />
      
      {uploadedImage && (
        <ColorExtractor 
          imageUrl={uploadedImage} 
          onColorsExtracted={handleColorExtraction} 
        />
      )}
      
      {extractedColors.length > 0 && (
        <>
          <PaletteDisplay 
            colors={extractedColors} 
            onPaletteTypeSelect={handlePaletteGeneration}
          />
          
          <PaletteCustomizer 
            palette={currentPalette} 
            onPaletteUpdate={setCurrentPalette}
          />
        </>
      )}
    </div>
  );
}

export default App;
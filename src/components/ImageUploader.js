import React, { useState, useRef } from 'react';

function ImageUploader({ onImageUpload }) {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setPreviewImage(imageDataUrl);
        onImageUpload(imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlUpload = (event) => {
    if (event.key === 'Enter') {
      const url = event.target.value;
      setPreviewImage(url);
      onImageUpload(url);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="flex flex-col items-center">
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <input 
          type="text" 
          placeholder="Paste image URL and press Enter" 
          onKeyDown={handleUrlUpload}
          className="w-full p-2 border rounded mb-4"
        />
        <button 
          onClick={triggerFileInput}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Image
        </button>
      </div>

      {previewImage && (
        <div className="mt-4 flex justify-center">
          <img 
            src={previewImage} 
            alt="Uploaded" 
            className="max-h-80 rounded-lg shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

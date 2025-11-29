'use client';

import { useState } from 'react';

interface DocumentUploaderProps {
  onImageSelect: (image: string) => void;
}

export default function DocumentUploader({ onImageSelect }: DocumentUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        onImageSelect(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 Upload Document</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer block"
        >
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Document preview"
                className="max-h-96 mx-auto rounded-lg shadow-md"
              />
              <p className="text-sm text-blue-600 font-semibold">
                Click to change document
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl">📸</div>
              <div>
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  Click to upload document
                </p>
                <p className="text-sm text-gray-500">
                  Passport, Visa, ID, or Driving License
                </p>
              </div>
            </div>
          )}
        </label>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p className="font-semibold mb-2">Supported documents:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Passports (all countries)</li>
          <li>National ID cards</li>
          <li>Driving licenses</li>
          <li>Visas and travel documents</li>
        </ul>
      </div>
    </div>
  );
}

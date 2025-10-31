import React from 'react';
import { Upload, FileCheck } from 'lucide-react';
import { Button } from '../ui/button';

export default function UploadZone({
  selectedMode,
  setSelectedMode,
  isDragging,
  isProcessing,
  progress,
  uploadedFile,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect
}) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedMode('gamma')}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
            selectedMode === 'gamma'
              ? 'bg-white text-[#0a1929] border-white/20 shadow-2xl scale-105'
              : 'bg-black/20 backdrop-blur-md text-white/80 border-white/10 hover:bg-black/30 hover:text-white'
          }`}
        >
          Remove Gamma Watermark
        </button>
        <button
          onClick={() => setSelectedMode('other')}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 border ${
            selectedMode === 'other'
              ? 'bg-white text-[#0a1929] border-white/20 shadow-2xl scale-105'
              : 'bg-black/20 backdrop-blur-md text-white/80 border-white/10 hover:bg-black/30 hover:text-white'
          }`}
        >
          Remove Other Watermark
        </button>
      </div>

      {/* Upload Area */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-12 shadow-2xl">
        {!isProcessing ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-white/80 bg-white/10 scale-105'
                : 'border-white/20 hover:border-white/40 hover:bg-white/5'
            }`}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/20">
                <Upload className="w-10 h-10 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Drop your PDF here
                </h3>
                <p className="text-white/60 text-lg">
                  or click to browse your files
                </p>
              </div>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer inline-block"
              >
                <Button 
                  size="lg"
                  type="button"
                  className="bg-white hover:bg-white/90 text-[#0a1929] shadow-2xl px-8 py-6 text-lg font-semibold cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    const input = document.getElementById('file-upload');
                    if (input) {
                      input.click();
                    }
                  }}
                >
                  Choose File
                </Button>
              </label>

              <p className="text-white/50 text-sm">
                Supported: PDF files up to 10MB
              </p>

              {uploadedFile && (
                <div className="mt-4 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                  <p className="text-white text-sm font-medium">
                    Selected: {uploadedFile.name}
                  </p>
                  <p className="text-white/60 text-xs mt-1">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl border border-white/20 animate-pulse">
                <FileCheck className="w-10 h-10 text-white" />
              </div>

              <div className="w-full max-w-md">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-lg">
                    Processing your PDF...
                  </span>
                  <span className="text-white/90 font-bold">
                    {progress}%
                  </span>
                </div>
                
                <div className="relative h-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-white transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {uploadedFile && (
                <p className="text-white/70 text-sm">
                  {uploadedFile.name}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



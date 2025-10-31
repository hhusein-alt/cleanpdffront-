import React, { useState } from 'react';
import { Upload, Sparkles, Zap, Shield, Github } from 'lucide-react';
import { Button } from '../components/ui/button';
import Navigation from '../components/home/Navigation';
import UploadZone from '../components/home/UploadZone';
import FeatureCard from '../components/home/FeatureCard';
import Footer from '../components/home/Footer';

export default function Home() {
  const [selectedMode, setSelectedMode] = useState('gamma');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    setIsProcessing(false);
    setProgress(0);
  };

  const handleProcessFile = async () => {
    if (!uploadedFile) {
      alert('Please select a PDF file first');
      return;
    }

    if (selectedMode !== 'gamma') {
      alert('Currently only Gamma watermark removal is supported');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append('pdf_file', uploadedFile);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      const response = await fetch(`${API_URL}/remove_watermark`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process PDF');
      }

      // Check if response is PDF or JSON
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/pdf')) {
        // Download the processed PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `processed_${uploadedFile.name}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        setIsProcessing(false);
        setProgress(0);
        setUploadedFile(null);
        alert('PDF processed successfully! Download started.');
      } else {
        // JSON response (no watermarks found)
        const data = await response.json();
        setIsProcessing(false);
        setProgress(0);
        alert(data.message || 'No watermarks found in PDF');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      setIsProcessing(false);
      setProgress(0);
      alert(`Error: ${error.message}`);
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Remove watermarks in seconds with our AI-powered technology'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your files are processed securely and deleted immediately after'
    },
    {
      icon: Sparkles,
      title: 'High Quality Output',
      description: 'Maintain original PDF quality with intelligent watermark removal'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0a1929]">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929]" />
      
      {/* Minimal glassmorphism accents */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <div className="px-6 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
                <span className="text-white/90 font-medium text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered PDF Watermark Removal
                </span>
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Remove your PDF
              <br />
              watermark in seconds
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto font-light">
              Clean, professional PDFs instantly. No signup required.
              <br />
              Your documents stay private and secure.
            </p>

            <Button 
              size="lg"
              onClick={uploadedFile ? handleProcessFile : undefined}
              disabled={isProcessing}
              className="bg-white hover:bg-white/90 text-[#0a1929] hover:scale-105 transition-all duration-300 shadow-2xl px-8 py-6 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isProcessing ? 'Processing...' : uploadedFile ? 'Process PDF' : 'Get Started Free'}
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Upload Zone */}
          <UploadZone
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            isDragging={isDragging}
            isProcessing={isProcessing}
            progress={progress}
            uploadedFile={uploadedFile}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
          />
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}



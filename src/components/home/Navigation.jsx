import React from 'react';
import { FileText, Github } from 'lucide-react';
import { Button } from '../ui/button';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                CleanPDF<span className="text-white/70">.ai</span>
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#" 
                className="text-white/70 hover:text-white transition-colors font-medium"
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-white/70 hover:text-white transition-colors font-medium"
              >
                Docs
              </a>
              <a 
                href="https://github.com/hhusein-alt/CleanPDF.ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-medium"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white hover:bg-white/10"
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}



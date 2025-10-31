import React from 'react';
import { Github, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-white/60">
              <span className="text-sm">
                © 2025 CleanPDF.ai • Made with
              </span>
              <Heart className="w-4 h-4 text-white/60 fill-white/60" />
              <span className="text-sm">
                for clean documents
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/hhusein-alt/CleanPDF.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">View on GitHub</span>
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
                AgenticAI Security
              </span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <button 
                onClick={() => scrollToSection('features')}
                className="hover:text-sky-500 transition-colors duration-300"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('demos')}
                className="hover:text-sky-500 transition-colors duration-300"
              >
                Demos
              </button>
              <button 
                onClick={() => scrollToSection('portal')}
                className="hover:text-sky-500 transition-colors duration-300"
              >
                Portal
              </button>
              <button 
                onClick={() => scrollToSection('docs')}
                className="hover:text-sky-500 transition-colors duration-300"
              >
                Docs
              </button>
              <button 
                onClick={() => scrollToSection('demo')}
                className="hover:text-sky-500 transition-colors duration-300"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection('demo')}
              className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-sky-500/25 transition-all duration-300"
            >
              Request Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-400 hover:text-slate-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
            <button
              onClick={() => scrollToSection('features')}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('demos')}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300"
            >
              Demos
            </button>
            <button
              onClick={() => scrollToSection('portal')}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300"
            >
              Portal
            </button>
            <button
              onClick={() => scrollToSection('docs')}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300"
            >
              Docs
            </button>
            <button
              onClick={() => scrollToSection('demo')}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300"
            >
              Contact
            </button>
            <div className="px-3 py-2">
              <Button 
                onClick={() => scrollToSection('demo')}
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
              >
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

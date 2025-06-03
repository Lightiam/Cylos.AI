import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield, Activity, Search } from "lucide-react";

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
                Cylos AI
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
                onClick={() => window.location.href = '/dashboard'}
                className="hover:text-sky-500 transition-colors duration-300 flex items-center gap-1"
              >
                <Shield className="h-4 w-4" />
                Dashboard
              </button>
              <button 
                onClick={() => window.location.href = '/threats'}
                className="hover:text-sky-500 transition-colors duration-300 flex items-center gap-1"
              >
                <Activity className="h-4 w-4" />
                Threats
              </button>
              <button 
                onClick={() => window.location.href = '/scans'}
                className="hover:text-sky-500 transition-colors duration-300 flex items-center gap-1"
              >
                <Search className="h-4 w-4" />
                Scans
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
              variant="outline" 
              className="border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900"
              onClick={() => window.location.href = '/login'}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white"
              onClick={() => window.location.href = '/signup'}
            >
              Get Started
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
              onClick={() => window.location.href = '/dashboard'}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300 flex items-center gap-2"
            >
              <Shield className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/threats'}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300 flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Threats
            </button>
            <button
              onClick={() => window.location.href = '/scans'}
              className="block px-3 py-2 text-slate-300 hover:text-sky-500 transition-colors duration-300 flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Scans
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
            <div className="px-3 py-2 space-y-2">
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/login'}
                className="w-full border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-900"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => window.location.href = '/signup'}
                className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

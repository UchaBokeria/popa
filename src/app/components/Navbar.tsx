import React, { useState } from 'react';
import { Button } from '../ui/button';
import MobileMenu from './MobileMenu';
import Logo from './Logo';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#1A1E2B] border-b border-[#E5253E]/30 shadow-[0_5px_15px_rgba(229,37,62,0.2)] py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Logo size="md" />
            <div className="text-[#E5253E] text-2xl font-bold tracking-wider">PUBG<span className="text-white">POINTS</span></div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-[#E5253E] relative group cursor-pointer">
              Home
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#E5253E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-white hover:text-[#E5253E] relative group cursor-pointer">
              Products
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#E5253E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-white hover:text-[#E5253E] relative group cursor-pointer">
              About
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#E5253E] group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#" className="text-white hover:text-[#E5253E] relative group cursor-pointer">
              Contact
              <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#E5253E] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center">
            <Button variant="primary" size="sm" className="cursor-pointer">
              შესვლა
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[#E5253E] focus:outline-none cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
} 
import React from 'react';
import { Button } from '../ui/button';

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#1A1E2B] border-b border-[#E5253E]/30 shadow-[0_5px_15px_rgba(229,37,62,0.2)] py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10">
          <div className="flex items-center">
            <a href="#" className="flex items-start">
              <img 
                src="https://i.ibb.co/qLYYXP28/logo.png" 
                alt="Popa Logo" 
                className="h-10 w-auto rounded-full"
              />
            </a>
          </div>
          
          <div className="flex items-center">
            <Button variant="primary" size="sm" className="cursor-pointer">
              შესვლა
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-[#E5253E] focus:outline-none cursor-pointer ml-4"
            onClick={() => window.dispatchEvent(new CustomEvent('toggle-mobile-menu'))}
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Spacer for fixed header */}
      <div className="h-20"></div>
    </>
  );
} 
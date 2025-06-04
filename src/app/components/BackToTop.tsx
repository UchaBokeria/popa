import React, { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up a scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 rounded-full p-3 z-50 transition-all duration-300 cursor-pointer
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        bg-[#1A1E2B] border border-[#E5253E]/50 shadow-sm
        hover:border-[#00C4FF]/50 group`}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#E5253E]/20 rounded-full group-hover:bg-[#00C4FF]/20 transition-colors duration-300"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#E5253E] group-hover:text-[#00C4FF] relative z-10 transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
} 
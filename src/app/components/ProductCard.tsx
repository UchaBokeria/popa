import React from 'react';
import { Button } from '../ui/button';

interface ProductCardProps {
  title: string;
  ucAmount: number;
  price: number;
  popular?: boolean;
}

export default function ProductCard({ title, ucAmount, price, popular = false }: ProductCardProps) {
  return (
    <div className="relative group cursor-pointer">
      {popular && (
        <div className="absolute -top-3 right-0 bg-[#E5253E] text-white text-xs py-1 px-3 rounded-full font-bold z-10 shadow-[0_0_10px_rgba(229,37,62,0.5)]">
          პოპულარული
        </div>
      )}
      
      <div className="bg-[#1A1E2B]/60 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col 
                   border border-[#1A1E2B] group-hover:border-[#E5253E]/50 shadow-[0_0_20px_rgba(0,0,0,0.3)]">
        
        {/* Glowing edges on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-x-0 h-px top-0 bg-gradient-to-r from-transparent via-[#E5253E] to-transparent"></div>
          <div className="absolute inset-y-0 w-px right-0 bg-gradient-to-b from-transparent via-[#E5253E] to-transparent"></div>
          <div className="absolute inset-x-0 h-px bottom-0 bg-gradient-to-r from-transparent via-[#E5253E] to-transparent"></div>
          <div className="absolute inset-y-0 w-px left-0 bg-gradient-to-b from-transparent via-[#E5253E] to-transparent"></div>
        </div>
        
        {/* Header */}
        <div className="bg-[#161A25] p-4 border-b border-[#E5253E]/20">
          <h3 className="text-white font-bold text-lg">{title}</h3>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="mb-4 text-center">
            <p className="text-4xl font-bold text-white mb-1">
              <span className="text-[#E5253E]">{ucAmount}</span> <span className="text-[#00C4FF]">UC</span>
            </p>
          </div>
          
          {/* Product Image */}
          <div className="mb-4 flex justify-center">
            <img 
              src="https://pbs.twimg.com/media/FzB-skpWcAAl0pX.jpg" 
              alt={`${ucAmount} UC`} 
              className="h-auto w-50 object-contain"
            />
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="text-gray-400">
              <span>ფასი</span>
            </div>
            <div className="text-white font-bold text-2xl">
              ₾{price.toFixed(2)}
            </div>
          </div>
          
          <Button variant="primary" className="mt-4 w-full cursor-pointer">
            იყიდე ახლავე
          </Button>
        </div>
      </div>
    </div>
  );
} 
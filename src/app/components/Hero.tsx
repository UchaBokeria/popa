import React from 'react';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#1A1E2B] min-h-[90vh] flex items-center px-40">
      {/* Base overlay with grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,_rgba(26,30,43,0.9)_80%)]"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(229,37,62,0.1)_3px,transparent_3px)] opacity-70"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(57,255,133,0.05)_1px,transparent_1px)] bg-[size:30px_100%]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(57,255,133,0.05)_1px,transparent_1px)] bg-[size:100%_30px]"></div>
      </div>
      
      {/* Cyberpunk effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-screen bg-[radial-gradient(circle_at_center,rgba(0,196,255,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-screen bg-[radial-gradient(circle_at_center,rgba(229,37,62,0.15)_0%,transparent_50%)]"></div>
        
        {/* Animated glitch elements - positioned away from character */}
        <div className="absolute top-1/4 left-1/4 w-1/4 h-1/5 bg-[#00C4FF]/5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1/5 h-1/6 bg-[#E5253E]/5 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/6 w-1/6 h-1/6 bg-[#39FF85]/5 blur-3xl animate-pulse delay-500"></div>
      </div>
      
      {/* Character div - positioned on the right side with fading effect */}
      <div className="absolute inset-0 z-10 bg-[#1A1E2B]">
        <div className="relative w-full h-full right-[-8vw]">
          {/* Character image with fade effect - full width and height */}
          <div 
            className="absolute inset-0 bg-[url('https://armadaboost.com/storage/game/images/buy-pubg-account-legit-armadaboost.png')] 
                      bg-cover bg-right-top bg-no-repeat"
          ></div>
          
          {/* Fade mask for character */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1E2B] via-[#1A1E2B]/80 to-transparent z-20"></div>
          
          {/* Character highlight glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(229,37,62,0.08)_0%,transparent_70%)]"></div>
        </div>
      </div>
      
      <div className="container mx-auto relative z-20">
        <div className="max-w-3xl flex flex-col gap-8">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="text-[#E5253E] text-shadow-glow-red">Popa</span> 
            <span className="text-white text-shadow-glow-white ml-3">UC პაკეტები</span>
          </h1>
          <p className="text-xl text-white max-w-2xl drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mt-2">
            გააძლიერე შენი თამაშის გამოცდილება მყისიერი UC მიწოდებით.
            მიიღე უპირატესობა ჩვენი უსაფრთხო და სწრაფი სერვისით.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button variant="secondary" size="lg" className="text-lg cursor-pointer  animate-float">
              იყიდე ახლავე
            </Button>
            <Button variant="accent" size="lg" className="text-lg cursor-pointer animate-float duration-600 ">
              ნახე პაკეტები
            </Button>
          </div>
          
          <div className="mt-8 flex items-center space-x-8 animate-float">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#39FF85] text-4xl font-bold drop-shadow-[0_0_10px_rgba(57,255,133,0.7)]">24/7</span>
              <span className="text-white text-sm">მხარდაჭერა</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#00C4FF] text-4xl font-bold drop-shadow-[0_0_10px_rgba(0,196,255,0.7)]">100%</span>
              <span className="text-white text-sm">უსაფრთხო</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[#E5253E] text-4xl font-bold drop-shadow-[0_0_10px_rgba(229,37,62,0.7)]">სწრაფი</span>
              <span className="text-white text-sm">მიწოდება</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

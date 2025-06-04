import React from 'react';
import { Button } from '../ui/button';

export default function CTASection() {
  return (
    <section className="py-20 relative">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,37,62,0.1)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_50px,rgba(229,37,62,0.03)_50px,rgba(229,37,62,0.03)_51px)]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold mb-6">
            <span className="text-[#E5253E] text-shadow-glow-red">გააძლიერე</span> 
            <span className="text-white text-shadow-glow-white ml-3">შენი თამაში</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            მიიღე უპირატესობა UC-ს მყისიერი მიწოდებით. უსაფრთხო, სწრაფი და საუკეთესო ფასებში.
            შემოუერთდი ათასობით კმაყოფილ მოთამაშეს დღესვე!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" size="lg" className="text-lg cursor-pointer">
              UC-ს ყიდვა
            </Button>
            <Button variant="accent" size="lg" className="text-lg cursor-pointer">
              ყველა პაკეტის ნახვა
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1A1E2B] border border-[#E5253E]/30 flex items-center justify-center text-[#E5253E] mb-4 group-hover:border-[#E5253E] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">მყისიერი მიწოდება</h3>
              <p className="text-gray-400 text-sm text-center">შენაძენი ავტომატურად მიეწოდება თქვენს ანგარიშს</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1A1E2B] border border-[#39FF85]/30 flex items-center justify-center text-[#39FF85] mb-4 group-hover:border-[#39FF85] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">100% უსაფრთხო</h3>
              <p className="text-gray-400 text-sm text-center">უსაფრთხო და დაცული ტრანზაქციები SSL შიფრაციით</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1A1E2B] border border-[#00C4FF]/30 flex items-center justify-center text-[#00C4FF] mb-4 group-hover:border-[#00C4FF] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">საუკეთესო ფასები</h3>
              <p className="text-gray-400 text-sm text-center">ყველაზე კონკურენტული ფასები ბაზარზე</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#1A1E2B] border border-[#E5253E]/30 flex items-center justify-center text-[#E5253E] mb-4 group-hover:border-[#E5253E] transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-1">24/7 მხარდაჭერა</h3>
              <p className="text-gray-400 text-sm text-center">ჩვენი გუნდი მზადაა დაგეხმაროთ ნებისმიერ დროს</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
import React from 'react';
import { Button } from '../ui/button';

export default function Footer() {
  return (
    <footer className="bg-[#151821] relative overflow-hidden px-40">
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,37,62,0.05)_1px,transparent_1px)] bg-[size:30px_100%] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(229,37,62,0.05)_1px,transparent_1px)] bg-[size:100%_30px] pointer-events-none"></div>
      
      <div className="container mx-auto py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              ბმულები
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E5253E] to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  მთავარი
                </a>
              </li>
              <li>
                <a href="/products" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  პაკეტები
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  ჩვენ შესახებ
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  დახმარება
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  კონტაქტი
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              პირობები
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E5253E] to-transparent"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  სერვისის პირობები
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  უსაფრთხოების პირობები
                </a>
              </li>
              <li>
                <a href="/refunds" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  ყიდვის პირობები
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  ინფორმაციის დაცვა
                </a>
              </li>
              <li>
                <a href="/copyright" className="text-gray-400 hover:text-[#E5253E] transition-colors duration-300">
                  საავტორო უფლებები
                </a>
              </li>
            </ul>
          </div>
          
          {/* Email Subscription */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              გამოიწერე
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E5253E] to-transparent"></span>
            </h3>
            <p className="text-gray-400 mb-4">გამოიწერეთ სპეციალური შეთავაზებები, უფასო საჩუქრები და განსაკუთრებული აქციები.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="თქვენი ელფოსტა" 
                className="bg-[#1A1E2B] text-white py-2 px-3 rounded-l-md border border-[#E5253E]/30 focus:outline-none focus:border-[#E5253E] w-full max-w-[200px]"
              />
              <Button variant="primary" className="rounded-l-none cursor-pointer h-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                </svg>
              </Button>
            </div>
          </div>
          
          {/* Social */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 relative inline-block">
              კონტაქტი
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-[#E5253E] to-transparent"></span>
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://tiktok.com/@popa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-[#1A1E2B] rounded-full flex items-center justify-center text-white hover:bg-[#E5253E] transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,37,62,0.5)]"
              >
                {/* TikTok Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6">
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com/popa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-[#1A1E2B] rounded-full flex items-center justify-center text-white hover:bg-[#E5253E] transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,37,62,0.5)]"
              >
                {/* Instagram Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/popa" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-12 h-12 bg-[#1A1E2B] rounded-full flex items-center justify-center text-white hover:bg-[#E5253E] transition-all duration-300 hover:shadow-[0_0_15px_rgba(229,37,62,0.5)]"
              >
                {/* Facebook Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
                  <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                </svg>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-400">გამოგვყევით სოციალურ ქსელებში ახალი შეთავაზებებისთვის!</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} <span className="font-bold">Popa</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
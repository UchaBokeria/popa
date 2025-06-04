import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function FeaturesSection() {
  return (
    <section className="py-20 relative" id="features">
      {/* Enhanced Cyberpunk background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(229,37,62,0.15)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,196,255,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_50px,rgba(57,255,133,0.03)_50px,rgba(57,255,133,0.03)_51px)]"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(229,37,62,0.05)_1px,transparent_1px)] bg-[size:50px_100%]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,196,255,0.05)_1px,transparent_1px)] bg-[size:100%_50px]"></div>
      
      {/* Accent elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#E5253E]/20 via-transparent to-[#00C4FF]/20"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-[#00C4FF]/20 via-transparent to-[#E5253E]/20"></div>
      
      <div className="container mx-auto px-40 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 inline-block">
            <span className="text-white">რატომ აირჩიოთ </span>
            <span className="text-[#E5253E] relative">
              Popa
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            ჩვენ გთავაზობთ უსწრაფეს, უსაფრთხო გზას UC-ის შესაძენად. აი, რატომ გვირჩევენ გეიმერები.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Best Price Feature Card */}
          <Card className="relative overflow-hidden group hover:border-[#39FF85]/70 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#39FF85] to-transparent"></div>
            <div className="absolute -right-20 -top-20 h-40 w-40 bg-[#39FF85]/10 rounded-full blur-xl group-hover:bg-[#39FF85]/20 transition-all duration-500"></div>
            
            <CardHeader className="pb-0">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-[#1A1E2B] rounded-xl border border-[#39FF85]/30 button-glow-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#39FF85]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">საუკეთესო ფასები</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39FF85] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">შეადარეთ ჩვენი ფასები - ჩვენ ვართ ყველაზე კონკურენტუნარიანი ბაზარზე</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39FF85] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">სპეციალური ფასდაკლებები დიდი UC პაკეტებისთვის</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39FF85] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">რეგულარული აქციები და შეზღუდული დროის შეთავაზებები</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#39FF85] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">ლოიალურობის პროგრამა მუდმივი მომხმარებლებისთვის</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Bonus Gifts Feature Card */}
          <Card className="relative overflow-hidden group hover:border-[#00C4FF]/70 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00C4FF] to-transparent"></div>
            <div className="absolute -right-20 -top-20 h-40 w-40 bg-[#00C4FF]/10 rounded-full blur-xl group-hover:bg-[#00C4FF]/20 transition-all duration-500"></div>
            
            <CardHeader className="pb-0">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-[#1A1E2B] rounded-xl border border-[#00C4FF]/30 button-glow-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00C4FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <CardTitle className="text-2xl">ბონუსები და საჩუქრები</CardTitle>
              </div>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00C4FF] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">უფასო ბონუს UC $25-ზე მეტი ღირებულების შენაძენისთვის</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00C4FF] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">ექსკლუზიური თამაშში გამოსაყენებელი ნივთები შერჩეულ პაკეტებთან ერთად</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00C4FF] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">ყოველთვიური გათამაშებები ჩვენი მომხმარებლებისთვის</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00C4FF] mr-2 flex-shrink-0 mt-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-white">მეგობრის მოწვევის პროგრამა ბონუსებით</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 
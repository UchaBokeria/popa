import React from 'react';
import { Card, CardContent } from '../ui/card';

interface TestimonialProps {
  name: string;
  role: string;
  quote: string;
  imageSrc: string;
  rating: number;
}

function Testimonial({ name, role, quote, imageSrc, rating }: TestimonialProps) {
  return (
    <Card className="h-full relative group hover:border-[#00C4FF]/50 transition-all duration-300 cursor-pointer animate-float">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#E5253E] to-transparent"></div>
      <div className="absolute -right-20 -top-20 h-40 w-40 bg-[#00C4FF]/10 rounded-full blur-xl group-hover:bg-[#00C4FF]/20 transition-all duration-500"></div>
      
      <CardContent className="p-6">
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < rating ? 'text-[#39FF85]' : 'text-gray-600'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        
        <blockquote className="text-white mb-6">"{quote}"</blockquote>
        
        <div className="flex items-center">
          <img
            src={imageSrc}
            alt={name}
            className="h-10 w-10 rounded-full mr-3 border border-[#E5253E]/30"
          />
          <div>
            <p className="font-medium text-white">{name}</p>
            <p className="text-sm text-gray-400">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Pro PUBG Player",
      quote: "Best service for buying UC! Instant delivery, great prices, and I've never had any issues. Been using them for 6 months now.",
      imageSrc: "/public/assets/images/testimonial-1.jpg",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "PUBG Streamer",
      quote: "I recommend PUBG POINTS to all my viewers. My UC always arrives within seconds, and their customer service is exceptional.",
      imageSrc: "/public/assets/images/testimonial-2.jpg",
      rating: 5
    },
    {
      name: "Mike Reynolds",
      role: "Casual Gamer",
      quote: "As someone who only plays occasionally, I appreciate how easy it is to buy small UC packages. Very straightforward process.",
      imageSrc: "/public/assets/images/testimonial-3.jpg",
      rating: 4
    }
  ];

  return (
    <section className="py-20 relative">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,37,62,0.1)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,transparent,transparent_50px,rgba(0,196,255,0.03)_50px,rgba(0,196,255,0.03)_51px)]"></div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 inline-block">
            <span className="text-white">What Our </span>
            <span className="text-[#E5253E] relative">
              Customers Say
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00C4FF] to-[#E5253E]"></span>
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from gamers who have used our service for their PUBG Mobile UC needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              imageSrc={testimonial.imageSrc}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
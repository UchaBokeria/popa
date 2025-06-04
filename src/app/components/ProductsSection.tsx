import React from 'react';
import ProductCard from './ProductCard';

export default function ProductsSection() {
  const products = [
    {
      id: 1,
      title: 'საწყისი პაკეტი',
      ucAmount: 60,
      price: 0.99,
      popular: false
    },
    {
      id: 2,
      title: 'სტანდარტული პაკეტი',
      ucAmount: 300,
      price: 4.99,
      popular: false
    },
    {
      id: 3,
      title: 'პრემიუმ პაკეტი',
      ucAmount: 600,
      price: 9.99,
      popular: true
    },
    {
      id: 4,
      title: 'ელიტ პაკეტი',
      ucAmount: 1500,
      price: 24.99,
      popular: false
    },
    {
      id: 5,
      title: 'სუპერ პაკეტი',
      ucAmount: 3000,
      price: 49.99,
      popular: false
    },
    {
      id: 6,
      title: 'VIP პაკეტი',
      ucAmount: 6000,
      price: 99.99,
      popular: false
    }
  ];

  return (
    <section className="py-20 px-40 relative" id="products">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,196,255,0.1)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_50px,rgba(229,37,62,0.03)_50px,rgba(229,37,62,0.03)_51px)]"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 inline-block">
            <span className="text-white">აირჩიე შენი </span>
            <span className="text-[#E5253E] relative ">
              UC პაკეტი
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Popa UC-ს პაკეტები შენი თამაშის გასაუმჯობესებლად.
            მყისიერი მიწოდება შენს ანგარიშზე.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              ucAmount={product.ucAmount}
              price={product.price}
              popular={product.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-[#E5253E]/20 py-4 cursor-pointer">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <span className={`ml-6 flex-shrink-0 text-[#E5253E] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div 
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 1000}px` : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        <p className="py-4 text-gray-300">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "როგორ მივიღო ჩემი UC ქულები? 🎮",
      answer: "შენი UC ქულები პირდაპირ გადაირიცხება შენს PUBG ანგარიშზე! 🪂 შეძენის შემდეგ, შეიყვანე შენი PUBG ID და ჩვენ გავაგზავნით ქულებს 24 საათის განმავლობაში."
    },
    {
      question: "რატომ არის თქვენთან იაფი? 💰",
      answer: "ჩვენ ვმუშაობთ პირდაპირ PUBG-თან, რომ შემოგთავაზოთ საუკეთესო ფასები! თამაშში 600 UC = 10 GEL, ჩვენთან კი მხოლოდ 8 GEL! 🚀"
    },
    {
      question: "როგორ გადავიხადო? 💳",
      answer: "შეგიძლია გადაიხადო მობილური გადახდით ან საბანკო ბარათით. ეს მარტივი და უსაფრთხოა! 🔒"
    },
    {
      question: "რა მოხდება, თუ UC არ მივიღე? 😱",
      answer: "არ ინერვიულო! დაგვიკავშირდი TikTok-ზე ან Instagram-ზე, და ჩვენ მოვაგვარებთ პრობლემას 24 საათში! 📱"
    },
    {
      question: "უსაფრთხოა თქვენი საიტი? 🔐",
      answer: "დიახ, 100%-ით უსაფრთხოა! ჩვენ ვიცავთ შენს მონაცემებს და გადახდები დაცულია. 500+ მოთამაშე გვენდობა! 🌟"
    },
    {
      question: "რა არის მომავლის საჩუქრები? 🎁",
      answer: "მალე შემოგთავაზებთ უფასო სკინებს და ბონუს UC ქულებს ჩვენი ერთგული მომხმარებლებისთვის! თვალი ადევნე განახლებებს TikTok-ზე! 🚀"
    },
    {
      question: "შემიძლია თუ არა PUBG ID-ის შეცვლა? ⚙️",
      answer: "დიახ, შეგიძლია შეცვალი შენი PUBG ID პროფილის გვერდზე ნებისმიერ დროს! 🛠️"
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative" id="faq">
      {/* Cyberpunk background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,133,0.05)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_50px,rgba(229,37,62,0.03)_50px,rgba(229,37,62,0.03)_51px)]"></div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 inline-block">
            <span className="text-white">ხშირად </span>
            <span className="text-[#E5253E] relative">
              დასმული კითხვები
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            გაქვთ კითხვები Popa UC-ის შესახებ? აქ იპოვით პასუხებს ყველაზე ხშირად დასმულ კითხვებზე.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-[#1A1E2B]/60 backdrop-blur-sm p-6 rounded-lg border border-[#E5253E]/20 shadow-[0_10px_30px_rgba(26,30,43,0.9)]">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
          
          <div className="mt-8 pt-4 flex flex-col gap-8 text-center">
            <p className="text-[#00C4FF]">კიდევ გაქვთ შეკითხვები?</p>
            <p className="text-gray-300 ">
              დაგვიკავშირდით TikTok-ზე ან Instagram-ზე სწრაფი პასუხისთვის!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
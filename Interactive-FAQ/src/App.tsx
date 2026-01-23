import React, { useState } from 'react'

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData : FAQItem[] = [
  {id: 1, question: "what is Tailwind CSS?", answer: "A utility-first CSS framework...."},
  {id: 2, question: "why use. TypeScript?", answer: "It adds static typing to JavaScript....."}
];


const App = () => {

  const [activeIndex, setActiveIndex] = useState<number | null > (null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-6'>Frequently Asked Questions</h2>

      {faqData.map((item, index) => {
        const isOpen = activeIndex === index;
        const panelId = `faq-panel-${item.id}`;

        return (
          <div key={item.id} className="border-b border-gray-200">

            <button 
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex justify-between items-center w-full py-4 text-left font-medium border-none outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            >
              <span>{item.question}</span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>


            <div
              id={panelId}
              role="region"
              className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 text-gray-600">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}


    </div>
  );

  
}

export default App
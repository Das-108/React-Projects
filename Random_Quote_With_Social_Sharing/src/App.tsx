import React, { useState, useEffect } from 'react'

interface QuoteData {
  advice: string;
  author: string;
}

const App = () => {
  // Use 'advice' consistently with your Interface
  const [quote, setQuote] = useState<QuoteData>({ advice: "Loading wisdom...", author: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      // 1. Call the .json() function
      const data = await response.json();

      // 2. Access the 'slip' property from this specific API
      setQuote({
        advice: data.slip.advice,
        author: "Life Advice" // This API doesn't provide authors, so we set a label
      });
    } catch (error) {
      console.error("Fetch error:", error);
      setQuote({ 
        advice: "Stay positive, work hard, make it happen.", 
        author: "Inspiration" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black flex items-center justify-center p-6 selection:bg-cyan-500/30 font-sans">
      
      {/* Background Decorative Glows */}
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
        
        <div className="mb-8 text-left">
          <h1 className="text-xs uppercase tracking-[0.3em] font-black text-cyan-500 mb-1">Perspective</h1>
          <p className="text-slate-400 text-sm font-medium">Change Mentality, Change Life</p>
        </div>
        
        <div className="relative min-h-40 text-left">
          <span className="absolute -top-6 -left-4 text-6xl text-white/10 font-serif leading-none">“</span>
          <blockquote className={`text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight italic font-serif transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            {/* 3. Ensure this matches your state property name */}
            {quote.advice}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px w-8 bg-cyan-500/50"></div>
            <p className="text-cyan-400 font-bold tracking-wide">{quote.author}</p>
          </div>
        </div>

        {/* Action Button */}
        <button
          className="mt-8 h-12 px-6 w-full sm:w-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95 disabled:opacity-50"
          onClick={fetchQuote}
          disabled={isLoading}
        >
          <i className={`ri-refresh-line ${isLoading ? 'animate-spin' : ''}`}></i>
          <span className="font-bold text-sm tracking-widest uppercase">New Advice</span>
        </button>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-left">
            Share the vibe
          </p>
          
          <div className='flex gap-4 text-2xl'>
            <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-90">
              <i className="ri-twitter-x-fill"></i>
            </button>
            <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-all active:scale-90">
              <i className="ri-facebook-circle-line"></i>
            </button>
            {/* Note: Fixed bg-linear to bg-gradient */}
            <button className="h-12 w-12 rounded-2xl bg-linear-to-tr from-orange-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 hover:brightness-110 transition-all active:scale-90">
              <i className="ri-instagram-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
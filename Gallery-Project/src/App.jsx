import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  const getData = async () => {
    try {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=34`)

      setUserData(response.data)
    } catch (error) {
      console.log("Error Fetching data: " , error)
    }    
  }

  useEffect( function() {
    getData()
  },[index])

  let printUserData = <h3 className='text-gray-400 font-semibold top-1/2 left-1/2 translate-x-1/2 translate-y-1/2'> Loading.....</h3>

  if(userData.length>0) {
    printUserData = userData.map(function(elem , index) {

      return (
        <div key={index}>
          <a href={elem.url}>
            <div className='h-40 w-44 bg-white    rounded-xl overflow-hidden'>
            <img className='h-full w-full object-cover' src={elem.download_url} alt="" />          
          </div>
          <h2 className='font-bold text-lg'>{elem.author}</h2>
          </a>
        </div>
        
      )
    })
  }

  return (
    <div className='bg-zinc-950 min-h-screen text-zinc-100 p-6 md:p-10 overflow-auto font-sans'>
      {/* Header Section */}
      <header className='mb-8 border-b border-zinc-800 pb-6'>
        <h1 className='text-4xl font-bold tracking-tight text-amber-400'>Gallery Project</h1>
        <div className='flex gap-4 mt-2 text-zinc-400 text-sm italic'>
          <p>📡 Images fetched via API</p>
          <p>🛠️ DevOps Practice Project</p>
        </div>
      </header>

      {/* Floating Page Indicator */}
      <div className='fixed top-6 right-6 z-50 shadow-xl'>
        <div className='bg-amber-500 text-black font-bold px-4 py-2 rounded-full flex items-center gap-2 border-2 border-black'>
          <span className='text-xs uppercase opacity-70'>Page</span>
          <span className='text-xl'>{index}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className='flex gap-6 flex-wrap justify-center py-6 min-h-[60vh]'>
        {printUserData.length > 0 ? (
          printUserData
        ) : (
          <div className="flex flex-col items-center justify-center opacity-20">
             <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
             <p className="mt-4">Loading Assets...</p>
          </div>
        )}
      </main>

      {/* Pagination Footer */}
      <footer className='flex flex-col items-center gap-4 mt-12 pb-10'>
        <div className='flex justify-center gap-8 items-center bg-zinc-900 p-4 rounded-2xl border border-zinc-800 shadow-2xl'>
          <button
            onClick={() => {
              if (index > 1) {
                setIndex(index - 1);
                setUserData([]);
              }
            }}
            disabled={index <= 1}
            className='bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-xl text-black shadow-lg shadow-amber-900/20'
          >
            Prev
          </button>

          <div className="text-center">
            <h4 className='text-zinc-500 text-xs uppercase font-bold tracking-tighter'>Current Navigation</h4>
            <p className='text-xl font-mono font-bold text-amber-500'>0{index}</p>
          </div>

          <button
            onClick={() => {
              setIndex(index + 1);
              setUserData([]);
            }}
            className='bg-amber-500 hover:bg-amber-400 active:scale-95 transition-all text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-xl text-black shadow-lg shadow-amber-900/20'
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App
import React, { useState } from 'react'
import Values from 'values.js'
import SingleColor from './componets/SingleColor'

const App = () => {

  const [color, setColor] = useState<string> ('')
  const [error, setError] = useState<boolean>(false)
  const [list, setList] = useState<Values[]>(new Values('#f15025').all(10))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      let colors = new Values(color).all(10)
      setList(colors)
      setError(false)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className='min-h-screen bg-slate-50'>
      <section className='flex flex-col md:flex-row items-center gap-8 p-8 max-w-6xl mx-auto'>
        <h3 className='text-2xl font-bold text-slate-800'>Bishal Gaihre</h3>
        <form onSubmit={handleSubmit} className='flex gap-0 shadow-sm'>
          <input
           type="text" 
           value={color}
           onChange={(e) => setColor(e.target.value)}
           placeholder='#3b82f6'
           className={`px-4 py-2 border-2 outline-none rounded-l-md transition-colors ${error ? 'border-red-500' : 'border-slate-200 focus:border-blue-500'}`}
          />
          <button
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-r-md font-medium transition-all'
            type='submit'
          >
            Generate
          </button>
        </form>
      </section>

      <section className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 min-h-[80vh]'>
        {list.map((color, index) => (
          <SingleColor key={index} {...color} hexColor={color.hex} index={index} />
        ))}
      </section>
      
    </div>
  )
}

export default App
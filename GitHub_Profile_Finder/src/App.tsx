import React, { useState } from 'react'
import User from './components/UiCard'

// types.ts
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

// This Discriminated Union makes "impossible states impossible"
export type SearchState = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: GitHubUser }
  | { status: 'error'; message: string };

const App = () => {

  const [username, setUsername] = useState('')
  const [state, setState] = useState<SearchState>({ status: 'idle'})

  const fetchUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return

    setState({ status: 'loading' })

    try {
      const response = await fetch(`https://api.github.com/users/${username}`)

      if (response.status === 404 ) {
        setState({ status: 'error' , message: 'User not Found. Try another handle!'})
        return;
      }

      if (!response.ok) {
        throw new Error('something went wrong with api.') 
      }

      const data: GitHubUser = await response.json();
      console.log(data)

      setState({ status: 'success', data })

    } catch (error) {

      setState({ status: 'error', message: error instanceof Error ? error.message : 'Unknown error' })

    }
  }

  return (
    <div className='max-w-md mx-auto p-6 '>
      <form onSubmit={fetchUser} className='flex gap-2 mb-6'>
        <input type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Search Github Username.....'
          className='flex-1 p-2 border rounded shadow-sm focus:ring-blue-500'
        />
        <button
          type='submit'
          className='bg-blue-600 rounded-2xl w-auto h-auto p-4 text-white'
        >
          Search
        </button>
      </form>

      {/* UI Sate Mapping */}
      {state.status === 'error' && (
        <div className='p-4 bg-red-100 text-red-700 rounded border border-red-200'>
          {state.message}
        </div>
      )}

      {state.status === 'success' && <User user={state.data} />}
    </div>
  )
}

export default App
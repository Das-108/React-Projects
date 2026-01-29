import React from 'react'
import type { GitHubUser } from '../App'

const UiCard: React.FC<{ user : GitHubUser }> = ({ user }) => {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden border'>
        <div className='flex items-center p-6 bg-gray-50 border-b'>            
            <img 
                src={user.avatar_url}
                alt={user.login}
                className='w-20 h-20 rounded-full border-4 border-white shadow-md'
            />
            <div className='ml-4'>                    
                <h2 className='text-xl font-bold'>{user.name || user.login}</h2>
                <a href={user.html_url} target='_blank' rel='noreferrer' className='text-blue-500 hover:underline'>
                    @{user.login}
                </a>
            </div>
        </div>

        <div className='p-6'>
            {user.bio && <p className='text-gray-600 mb-4 italic'>"{user.bio}"</p>}

            <div className='grid grid-cols-3 gap-4 text-center'>
                <div className='bg-gray-50 p-2 rounded'>
                    <span className='block font-bold'>{user.public_repos}</span>
                    <span className='text-xs text-gray-500 uppercase'>Repos</span>
                </div>

                <div className='bg-gray-50 p-2 rounded '>
                    <span className='block font-bold'>{user.followers}</span>
                    <span className='text-xs text-gray-500 uppercase'>Followers</span>
                </div>
                
                <div className='bg-gray-50 p-2 rounded'>
                    <span className='block font-bold'>{user.following}</span>
                    <span className='text-xs text-gray-500 uppercase'>Following</span>
                </div>                

            </div>
        </div>

    </div>
  )
}

export default UiCard
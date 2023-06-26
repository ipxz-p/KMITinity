import { Eye, Heart } from 'lucide-react'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Questions = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <div className='flex justify-between'>
          <p className='text-header'>Your questions</p>
          <div>
            <button onClick={() => navigate('/questions/create')} className='py-1 px-2 bg-dark-300 rounded-md'>Create</button>
          </div>
        </div>
        <div className='mt-2 grid lg:grid-cols-2 gap-3'>
          <div className='p-2 bg-dark-300 rounded-md cursor-pointer'>
            <p className='truncate'>How can i do?</p>
            <p className='text-small text-gray-400 truncate'>what the fuck haha i love it so much qeqweqweqwewqewqeqweq</p>
            <div className='text-xs mt-2 flex gap-2 flex-wrap'>
              <div className='bg-dark-100 inline-block p-1 rounded-md'>
                <p>javascript</p>
              </div>
              <div className='bg-dark-100 inline-block p-1 rounded-md'>
                <p>nodejs</p>
              </div>
              <div className='bg-dark-100  p-1 rounded-md'>
                <p>react</p>
              </div>
            </div>
            <div className='text-small flex mt-2'>
              <div className='flex items-center'>
                <Eye className='h-4 w-4 mr-1' />
                <p>120</p>
              </div>
              <div className='flex items-center ml-3'>
                <Heart className='h-4 w-4 mr-1' />
                <p>50</p>
              </div>
            </div>
          </div>

          <div className='p-2 bg-dark-300 rounded-md cursor-pointer'>
            <p className='truncate'>How can i do?</p>
            <p className='text-small text-gray-400 truncate'>what the fuck haha i love it so much qeqweqweqwewqewqeqweq</p>
            <div className='text-xs mt-2 flex gap-2 flex-wrap'>
              <div className='bg-dark-100 inline-block p-1 rounded-md'>
                <p>javascript</p>
              </div>
              <div className='bg-dark-100 inline-block p-1 rounded-md'>
                <p>nodejs</p>
              </div>
              <div className='bg-dark-100  p-1 rounded-md'>
                <p>react</p>
              </div>
            </div>
            <div className='text-small flex mt-2'>
              <div className='flex items-center'>
                <Eye className='h-4 w-4 mr-1' />
                <p>120</p>
              </div>
              <div className='flex items-center ml-3'>
                <Heart className='h-4 w-4 mr-1' />
                <p>50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Questions
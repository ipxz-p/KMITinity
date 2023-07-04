import { Eye, Heart, MessageSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useGetQuestionQuery } from '../app/api/questionApislice'

const Questions = () => {
  const navigate = useNavigate()
  const { data } = useGetQuestionQuery('questionsList');
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    if (data) {
      const userKeys = Object.keys(data.entities);
      const questionsArr = userKeys.map((userProp) => data.entities[userProp]);
      setQuestions(questionsArr);
    }
  }, [data]);
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
          {questions.map((question) => (
              <div className='p-2 bg-dark-300 rounded-md cursor-pointer' key={question._id}>
                <p className='truncate'>{question['title']}</p>
                <p className='text-small text-gray-400 truncate'>{question['description']}</p>
                <div className='text-xs mt-2 flex gap-2 flex-wrap'>
                  {
                    question?.tags.map((tag, index)=>(
                      <div className='bg-dark-100 inline-block p-1 rounded-md' key={index}>
                        <p>{tag}</p>
                      </div>
                    ))
                  }
                </div>
                <div className='text-small flex mt-2'>
                  <div className='flex items-center'>
                    <Eye className='h-4 w-4 mr-1' />
                    <p>{question.views.length}</p>
                  </div>
                  <div className='flex items-center ml-3'>
                    <Heart className='h-4 w-4 mr-1' />
                    <p>{question.like.length}</p>
                  </div>
                  <div className='flex items-center ml-3'>
                    <MessageSquare className='h-4 w-4 mr-1' />
                    <p>{question.comments.length}</p>
                  </div>
                </div>
              </div>
              ))
            }
        </div>
      </div>
      
    </div>
  )
}

export default Questions
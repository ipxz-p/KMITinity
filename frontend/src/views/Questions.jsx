import { Eye, Heart, MessageSquare } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetQuestionQuery } from '../app/api/questionApislice'

const Questions = () => {
  const navigate = useNavigate()
  const { data } = useGetQuestionQuery('questionsList', {
    refetchOnMountOrArgChange: true
  });
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
          <p className='text-header'>Questions</p>
          <div>
            <button onClick={() => navigate('/questions/create')} className='py-1 px-2 bg-dark-300 rounded-md'>Create</button>
          </div>
        </div>
        <div className='mt-2 grid md:grid-cols-2 gap-3 pb-4'>
          {questions.map((question) => (
              <Link to={`question/${question._id}`} className='p-2 bg-dark-300 rounded-md cursor-pointer flex flex-col justify-between' key={question._id}>
                <div>
                  <div className='flex items-center'>
                      <img className='h-8 w-8 rounded-full mr-2' src={`${process.env.REACT_APP_BASEURL}/public/img/${question?.owner.profileImgPath}`} alt="" />
                      <p className=''>
                      {
                        question?.owner.username
                      }
                      </p>
                      <div className='flex items-center mt-[0.15rem]'>
                        <div className='w-1 h-1 bg-gray-400 rounded-full mx-2'></div>
                        <p className='flex items-center justify-center text-small'>
                            {question.createdAt}
                        </p>
                      </div>
                  </div>
                  <p className='truncate mt-2'>{question['title']}</p>
                  <p className='text-small text-gray-400 truncate'>{question['description']}</p>
                  {
                    question.tags.length > 0 && (
                      <div className='text-xs mt-2 flex gap-2 flex-wrap'>
                        {
                          question?.tags.map((tag, index)=>(
                            <div className='bg-dark-100 inline-block p-1 rounded-md' key={index}>
                              <p>{tag}</p>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
                <div className='flex mt-2'>
                  {/* <div className='flex items-center justify-center'>
                    <img className='h-7 w-7 rounded-full mr-1' src={`${process.env.REACT_APP_BASEURL}/public/img/${question?.owner.profileImgPath}`} alt="" />
                    <p className=''>
                    {
                      question?.owner.username
                    }
                    </p>
                  </div>
                  <div className='w-[0.08rem] mx-2 mt-1 bg-gray-400'></div> */}
                  <div className='text-small flex mt-1'>
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
              </Link>
              ))
            }
        </div>
      </div>
      
    </div>
  )
}

export default Questions
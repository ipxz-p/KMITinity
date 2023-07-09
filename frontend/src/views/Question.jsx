import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetQuestionQuery } from '../app/api/questionApislice';
import { Eye, Heart, MessageSquare } from 'lucide-react';

const Question = () => {
    const params = useParams()
    const { id } = params;
    const { question } = useGetQuestionQuery('questionsList', {
        selectFromResult: ({ data }) => {
            if (data) {
                const questionKeys = Object.keys(data.entities);
                for (let i = 0; i < questionKeys.length; i++) {
                    const questionProp = questionKeys[i];
                    if (data.entities[questionProp]._id === id) {
                        return {
                            question: data.entities[questionProp]
                        };
                    }
                }
            }
            return {
                question: null
            }
        }
    })

    return (
        <div>
            {question && (
                <div >
                    <div className='flex justify-between items-center border-b-2 pb-2 border-gray-400'>
                        <div>
                            <p className='text-header font-semibold'>{question.title}</p>
                            <div className='flex items-center'>
                                <img className='w-8 h-8 rounded-full' src={`${process.env.REACT_APP_BASEURL}/public/img/${question.owner.profileImgPath}`} alt="" />
                                <p className=' ml-2'>
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
                                <div className='w-[0.08rem] h-[22px] mt-1 bg-gray-400 mx-3'></div>
                                <div className='text-small flex mt-1'>
                                    <div className='flex items-center'>
                                        <Eye className='h-4 w-4 mr-1' />
                                        <p>{question.views.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center'>
                            <Heart className='h-7 w-7' />
                            <p>{question.like.length}</p>
                        </div>
                    </div>
                    <div className='mt-2 text-gray-400'>
                        {question.description}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Question
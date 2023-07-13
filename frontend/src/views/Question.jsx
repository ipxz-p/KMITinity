import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetQuestionQuery } from '../app/api/questionApislice';
import { Eye, Heart, MessageSquare, Send } from 'lucide-react';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../swiper.css'

const Question = () => {
    const iconSendRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        autoResizeInput(event.target);
    };
    const autoResizeInput = (element) => {
        element.style.height = '30px';
        iconSendRef.current.style.alignItems = 'center'
        if(element.scrollHeight > 30){
            element.style.height = element.scrollHeight + 'px';
            iconSendRef.current.style.alignItems = 'end'
        }
    };
    const renderFormattedText = () => {
        const lines = inputValue.split('\n');
        if(lines.length > 1){
            return lines.map((line, index) => <React.Fragment key={index}>{line}<br/></React.Fragment>);
        }
        return inputValue
    };
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
                <div className='pb-4'>
                    <div className='flex justify-between items-center border-b-2 pb-4 border-gray-400'>
                        <div>
                            <p className='text-header font-semibold'>{question.title}</p>
                            <div className='flex items-center'>
                                <img className='w-8 h-8 rounded-full ' src={`${process.env.REACT_APP_BASEURL}/public/img/${question.owner.profileImgPath}`} alt="" />
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
                        <div className='flex flex-col items-center justify-center mt-3'>
                            <Heart className='h-7 w-7 cursor-pointer' />
                            <p>{question.like.length}</p>
                        </div>
                    </div>
                    <div className='mt-4 text-gray-400'>
                        {question.description}
                    </div>
                    {
                        question.images.length > 0 && (
                            <div className='flex mt-2'>
                                <Swiper
                                    // install Swiper modules
                                    modules={[Navigation, A11y]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    navigation
                                    pagination={{ clickable: true }}
                                >
                                    {
                                        Object.keys(question.images).map((image) => (
                                            <SwiperSlide key={image}>
                                                <div className='flex justify-center items-center h-full'>
                                                    <img className='object-cover object-center rounded-md mx-auto ' src={`${process.env.REACT_APP_BASEURL}/public/img/${question.images[image]}`}></img>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                        )
                    }
                    <div>
                        <p className='text-header mt-6'><span className='mr-2'>{question.comments.length}</span> Answer</p>
                    </div>
                    <div>
                        {renderFormattedText()}
                    </div>
                    <form onSubmit={() => alert(555)}>
                        <div className='bg-dark-300 p-3 rounded-md mt-2 flex gap-3'>
                            <div className='w-full flex items-center justify-center'>
                                <textarea 
                                className='outline-none bg-dark-300 w-full resize-none mt-1 h-[30px]'
                                onChange={handleInputChange}
                                value={inputValue}
                                placeholder='Write a comment...'
                                >
                                </textarea>
                            </div>
                            <div ref={iconSendRef} className='flex items-center justify-center'>
                                <Send className='h-5 w-5 cursor-pointer' />
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Question
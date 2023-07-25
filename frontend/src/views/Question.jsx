import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { questionApiSlice, useAddCommentMutation, useAddLikeMutation, useGetQuestionQuery, useViewQuestionMutation } from '../app/api/questionApislice';
import { Eye, Heart, MessageSquare, Send } from 'lucide-react';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '../asset/css/swiper.css'
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../app/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const Question = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const { id } = params;
    const { data: queryQuestion, isLoading, isSuccess } = useGetQuestionQuery(id, { refetchOnMountOrArgChange: true })
    const [question, setQuestion] = useState(null)
    useEffect(() => {
        if (queryQuestion) {
            setQuestion(queryQuestion?.entities?.[id])
        }
    }, [queryQuestion])
    const [checkLiked, setCheckLiked] = useState(false);
    const [questionLegth, setQuestionLegth] = useState(null)
    const userData = useSelector(selectUserData)
    useEffect(() => {
        if (question) {
            setQuestionLegth(question?.like.length)
            setCheckLiked(question?.like.includes(userData?.id))
        }
    }, [question])
    const [viewQuestion] = useViewQuestionMutation()
    const handleViewQuestion = async () => {
        try {
            await viewQuestion({ userID: userData.id, questionID: id })
            dispatch(questionApiSlice.endpoints.getQuestion.initiate(undefined, {forceRefetch: true}))
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (userData.id) {
            handleViewQuestion()
        }
    }, [queryQuestion, userData])
    const iconSendRef = useRef(null);
    const textareaRef = useRef(null)
    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        autoResizeInput(event.target);
    };
    const autoResizeInput = (element) => {
        element.style.height = '30px';
        iconSendRef.current.style.alignItems = 'center'
        if (element.scrollHeight > 30) {
            element.style.height = element.scrollHeight + 'px';
            iconSendRef.current.style.alignItems = 'end'
        }
    };
    const [addComment] = useAddCommentMutation()
    const handleAddComment = async (e) => {
        e.preventDefault()
        if (inputValue.replace(/\n/g, "") === '') {
            return alert("Please enter a comment")
        }
        try {
            await addComment({ comment: inputValue, author: userData.id, questionID: id }).unwrap()
            setInputValue('')
            textareaRef.current.style.height = '30px';
            iconSendRef.current.style.alignItems = 'center'
        } catch (error) {
            alert(error)
        }
    }
    const formattedDate = (date) => {
        const mongodbDate = new Date(date); // ตัวอย่างวันที่จาก MongoDB
        const day = mongodbDate.getDate().toString().padStart(2, "0");
        const month = (mongodbDate.getMonth() + 1).toString().padStart(2, "0");
        const year = mongodbDate.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }
    const formattedTime = (date) => {
        const mongodbDate = new Date(date); // ตัวอย่างวันที่จาก MongoDB
        const hours = mongodbDate.getHours().toString().padStart(2, "0");
        const minutes = mongodbDate.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    }
    const renderFormattedText = (comment) => {
        const commentSpllit = comment.split('\n');
        if (commentSpllit.length > 1) {
            return commentSpllit.map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>);
        }
        return comment
    };
    const [addLike] = useAddLikeMutation()
    const handleAddLike = async () => {
        try {
            if (checkLiked) {
                setQuestionLegth((prev) => prev - 1)
            } else {
                setQuestionLegth((prev) => prev + 1)
            }
            setCheckLiked((prev) => !prev)
            await addLike({ userID: userData.id, questionID: id })
        } catch (error) {
            console.log(error);
        }
    }
    // mui customization theme
    return (
        <div>
            {
                (!question && isLoading) && (
                    <div className='mt-20 flex justify-center items-center'>
                        <CircularProgress color='white' />
                    </div>
                )

            }
            {
                (!question && isSuccess) && (
                    <p className='text-header'>No question found</p>
                )
            }
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
                            <Heart onClick={handleAddLike} className='h-7 w-7 cursor-pointer'
                                fill={checkLiked ? '#fff' : 'black'}
                            />
                            <p className='select-none'>{questionLegth}</p>
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
                        <form>
                            <div className='bg-dark-300 p-3 rounded-md mt-2 flex gap-3'>
                                <div className='w-full flex items-center justify-center'>
                                    <textarea
                                        ref={textareaRef}
                                        className=' scrollbar-hidden outline-none bg-dark-300 w-full resize-none mt-1 h-[30px] max-h-[200px]'
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" && !event.shiftKey) {
                                                handleAddComment(event)
                                            }
                                        }}
                                        onChange={handleInputChange}
                                        value={inputValue}
                                        placeholder='Write a comment...'
                                    >
                                    </textarea>
                                </div>
                                <div ref={iconSendRef} className='flex items-center justify-center'>
                                    <Send onClick={handleAddComment} className='h-5 w-5 cursor-pointer' />
                                </div>
                            </div>
                        </form>
                        {
                            Object.keys(question?.comments).length > 0 && (
                                <div className='mt-6 flex flex-col gap-2'>
                                    {

                                        Object.keys(question?.comments).map((comment) => (
                                            <div className='bg-dark-300 p-3 rounded-md' key={comment}>
                                                <div className='flex items-center'>
                                                    <img className='w-8 h-8 rounded-full ' src={`${process.env.REACT_APP_BASEURL}/public/img/${question.comments[comment].author.profileImgPath}`} alt="" />
                                                    <p className=' ml-2'>
                                                        {
                                                            question.comments[comment].author.username

                                                        }
                                                    </p>
                                                    <div className='flex items-center mt-[0.15rem]'>
                                                        <div className='w-1 h-1 bg-gray-400 rounded-full mx-2'></div>
                                                        <p className='flex items-center justify-center text-small'>
                                                            {formattedDate(question.comments[comment].date)}
                                                        </p>
                                                    </div>
                                                    <div className='w-[0.08rem] h-[15px] bg-gray-400 mx-2 mt-[0.15rem]'></div>
                                                    <p className='flex items-center justify-center text-small mt-[0.15rem]'>
                                                        {formattedTime(question.comments[comment].date)}
                                                    </p>
                                                </div>
                                                <p className='mt-2'>
                                                    {renderFormattedText(question.comments[comment].comment)}
                                                </p>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }

                    </div>
                </div>
            )
            }
        </div>

    )
}

export default Question
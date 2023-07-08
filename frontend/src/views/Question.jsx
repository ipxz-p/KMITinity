import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetQuestionQuery } from '../app/api/questionApislice';

const Question = () => {
    const params = useParams()
    const { id } = params;
    const { question } = useGetQuestionQuery('questionsList', {
        selectFromResult: ({data}) => {
            if(data){
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
            {question && (question.images[2])}
        </div>
    )
}

export default Question
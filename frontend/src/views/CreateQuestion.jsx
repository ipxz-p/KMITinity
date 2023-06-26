
import { X } from 'lucide-react'
import React, { useState } from 'react'

const CreateQuestion = () => {
    const [tags, setTags] = useState([])
    const [tagValue, setTagValue] = useState('')
    const handleCreateQuestion = (e) => {
        alert('submit')
    }
    const handleAddTags = (e) => {
        if (e.key === 'Enter' && tagValue !== '') {
            setTags((prevValue) => [...prevValue, tagValue])
            setTagValue('')
            e.preventDefault();
        }
    }
    const handleDeleteValue = (index) => {
        setTags((prevTags) => {
            const newTags = [...prevTags];
            newTags.splice(index, 1);
            return newTags;
        });
    }
    return (
    <form onSubmit={handleCreateQuestion}>
        <div>
            <p className='text-header'>Create Question</p>
        </div>
        <div>
            <div className='mt-2'>
                <label>Title</label>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
                    <input className='bg-dark-100 w-full outline-none' type="text" placeholder='Title' autoComplete="off" />
                </div>
            </div>
            <div className='mt-2'>
                <label>Description</label>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
                    <input className='bg-dark-100 w-full outline-none' type="text" placeholder='Description' autoComplete="off" />
                </div>
            </div>
            <div className='mt-2'>
                <label>Tags (optional and press enter to add tags)</label>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
                    <input onKeyDown={handleAddTags} value={tagValue} onChange={(e)=>setTagValue(e.target.value)} className='bg-dark-100 w-full outline-none' type="text" placeholder='Tags' autoComplete="off" />
                </div>
                <div className='flex gap-1 mt-2'>
                    {
                        tags.map((value, index) => (
                            <div className='bg-dark-200 flex items-center px-2 py-1 rounded-full' key={index}>
                                <p>{value}</p>
                                <X className='h-4 w-4 ml-1 cursor-pointer' onClick={()=>handleDeleteValue(index)} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-end my-4'>
                <button type='submit' className='bg-dark-400 rounded-md px-6 py-2 my-2'>
                    Create
                </button>
            </div>
        </div>
    </form>
    )
}

export default CreateQuestion

import { ImagePlus, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useCreateQuestionMutation } from '../app/api/questionApislice'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserData } from '../app/userSlice'
const CreateQuestion = () => {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [des, setDes] = useState('')
    const [tags, setTags] = useState([])
    const [imgs, setImgs] = useState([])
    const [imgURL, setImgURL] = useState([]);
    const [tagValue, setTagValue] = useState('')
    const [createQuestion] = useCreateQuestionMutation()
    const userData = useSelector(selectUserData)
    const handleCreateQuestion = async (e) => {
        e.preventDefault()
        if(title === '' || des === ''){
            return alert("Please enter title and description")
        }
        try {
            let res = await createQuestion({title: title, 
                description: des, owner: userData.id, 
                tags: tags, images: imgs }).unwrap()
            alert(res.message)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
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
    const handleFileChange = (e) => {
        setImgs((prevValue) => [...prevValue, e.target.files])
        const files = e.target.files;
        const urls = [];
        for (let i = 0; i < files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            urls.push(url);
        }
        setImgURL((prevValue) => [...prevValue, ...urls]);
        // setImgURL((prevValue) => [...prevValue, url]);
    }
    const handleDeleteImg = (index) => {
        setImgs((prevImg) => {
            const newImg = [...prevImg];
            newImg.splice(index, 1);
            return newImg;
        });
        setImgURL((prevImgURL) => {
            const newImgURL = [...prevImgURL];
            newImgURL.splice(index, 1);
            return newImgURL;
        });
    }
    return (
    <form className='' onSubmit={handleCreateQuestion}>
        <div>
            <p className='text-header'>Create Question</p>
        </div>
        <div>
            <div className='mt-2'>
                <label>Title</label>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} className='bg-dark-100 w-full outline-none' type="text" placeholder='Title' autoComplete="off" />
                </div>
            </div>
            <div className='mt-2'>
                <label>Description</label>
                <div className='bg-dark-100 rounded-md w-full flex p-2 mt-1'>
                    <input value={des} onChange={(e)=>setDes(e.target.value)}  className='bg-dark-100 w-full outline-none' type="text" placeholder='Description' autoComplete="off" />
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
            <div className=''>
                <div>Images (optional)</div>
                <div className='relative mt-1 cursor-pointer bg-dark-100 p-2 inline-flex  rounded-md '>
                    <ImagePlus />
                    <p className='ml-2'>Add images</p>
                    <input onChange={(e) => {
                        handleFileChange(e)
                    }} type="file" name="images" id="" accept='.jpg,.png' multiple className='cursor-pointer absolute inset-0 opacity-0 rounded-md' />
                </div>
            </div>
            <div className='flex flex-wrap gap-1 mt-2'>
                {
                    imgURL.map((value, index) => (
                        <div className='relative h-32 w-32' key={index}>
                            <img className='h-32 w-32 rounded-md' src={value} alt="" />
                            <X className='h-5 w-5 p-[2px] absolute top-1 right-1 cursor-pointer bg-white rounded-full text-black' onClick={()=>handleDeleteImg(index)} />
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-end pt-4'>
                <button type='submit' className='bg-dark-400 rounded-md px-6 py-2 my-2'>
                    Create
                </button>
            </div>
        </div>
    </form>
    )
}

export default CreateQuestion
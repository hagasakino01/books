import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { Image } from 'antd';
import notification from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import { getIsLock } from '../features/featuresHome/HomeSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { TextArea } = Input;


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
function BookDetails() {
  const [input, setInput] = useState({});

  const [isEdit, setIsEdit] = useState(false);

  const [err, setErr] = useState(false);
  const [onEdit, setonEdit] = useState(true);

  const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const bookDetail = useSelector((state) => state.home.bookDetail)
  const isView = useSelector((state) => state.home.isLock)
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(bookDetail)
  
  useEffect(() => {
    if(onEdit){
      setInput({author: bookDetail.author,
                date:bookDetail.date,
                detail:bookDetail.detail,
                numOfPage: bookDetail.numOfPage,
                title: bookDetail.title,
                type: bookDetail.type,
                urlImage:  bookDetail.urlImage
              })
            }
  }, [isEdit])

  useEffect(() => {
    if(isView){
      setImgData(bookDetail.urlImage)
    }
  }, [])
 
  const handleLogout=()=>{
    localStorage.clear();
    
    window.location.reload();
  }


 

console.log(input)

const handleEdit=()=>{
  dispatch(getIsLock(false))
  setIsEdit(true)
}
const handleCancelFix=()=>{
  dispatch(getIsLock(true))
  setonEdit(true)
  setIsEdit(false)
  setImgData(bookDetail.urlImage)
}
const handleSave= async (data)=>{
  setLoading(true)
  try {
    const { data: res } = await axios.put(`https://app-bookss.herokuapp.com/api/update-book/${bookDetail._id}`, data);
    console.log(res)
    if(res.success){
      setLoading(false)
      
      dispatch(getIsLock(true))
      setonEdit(false)
      setIsEdit(false)
      alert('sửa sách thành công')
    }
} catch (error) {
    console.error(error);
}
  
}
  const handleAddBook=async (data)=>{ 
    
    try {
      const { data: res } = await axios.post('https://app-bookss.herokuapp.com/api/add-book', data);
      console.log(res)
      if(res.success){
        setLoading(false)
        alert('thêm sách thành công')
        navigate('/')
        
      }else{
        alert('có lỗi xảy ra')
      }

  } catch (error) {
      console.error(error);
  }
  }
  const handleAddBookCheck=(data)=>{
   
    if(input.title && input.author && input.detail && input.date && input.numOfPage && input.type ){
      console.log(data)
      setErr(false)
      handleAddBook(data)
      setLoading(true)
    }
    else {
      setErr(true)
    }
  }
  const handleBack=()=>{
    navigate('/')
  }

  const onChangePicture = e => {
    if (e.target.files[0]) {
      
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      
      reader.addEventListener("load", () => {
        setImgData(reader.result);
        setInput(prevState => ({ ...prevState, urlImage : reader.result }))
      });
      reader.readAsDataURL(e.target.files[0]);
      
    
    }
    
  };

  return (
    <div className='flex flex-col pb-[50px]'>
      <div className='fixed w-full bg-white shadow-md z-10'>
        <div className='flex justify-between py-[8px] px-[8px]  border-b-[1px] '>
          <div className='py-[8px] ml-[10px]'>
              <HomeOutlined style={{ fontSize: '25px',  }} onClick={()=>handleBack()}/>          
          </div>
          <div className='flex flex-row items-end w-[180px] h-[45px]'>
            <div className='flex flex-row items-center justify-center mx-[4px] mb-[10px]'>
              <img className='w-[24px]  ' src={notification} alt="" />
            </div>
            <div className='flex flex-row items-center'>
              <div className='w-[42px] h-[42px] rounded-[50px] mx-[4px]'>
                <img className='w-[42px] h-[42px] rounded-[50px]' src={thangBang} alt="" />
              </div>
              <div className=' mx-[4px]'>
                <p className='text-[14px] text-[#7D7D7D] mb-0'>Xin chào</p>
                <p className='text-[14px] text-[#EA6200] mb-0'>Admin001</p>
              </div>
              <div onClick={()=>handleLogout()}>
                <img className='w-[24px] cursor-pointer' src={logout}  alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center mt-[80px]'>
        <div className='max-w-[500px]'>
          <p className='text-[60px] font-semibold text-indigo-500 h-[60px] mb-[10px]'>Welcome</p>
          <p className='text-[48px] text-amber-300 '>to your library</p>
        </div>
      </div>
      <div className='flex flex-row px-[24px] w-full justify-center'>
        <div className='flex flex-col w-1/2 px-[10px] max-w-[620px] '>
          <div className='flex flex-row my-[20px]'>
            <div className='flex flex-col w-1/2 pr-[10px]'>
              <p className='text-left text-[18px] font-semibold text-gray-600 '>Tiêu đề</p>
              <Input type="text" className=' h-[36px]  hover:shadow' 
                name="title" value={input.title || bookDetail.title } onChange={handleChange} disabled={isView}
              />
            </div>
            <div className='flex flex-col w-1/2 pr-[10px]'>
              <p className='text-left text-[18px] font-semibold text-gray-600 '>Tác giả</p>
              <Input className=' h-[36px]  hover:shadow' type="text" 
                name="author" value={input.author || bookDetail.author } onChange={handleChange} disabled={isView}
              />
            </div>
          </div>
          <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600'>Mô tả về sách</p>
            <TextArea
            className=" w-full  hover:shadow"
            rows={6}
            cols={80}
            id=""
            placeholder=""
            name="detail" value={input.detail || bookDetail.detail } onChange={handleChange}
            disabled={isView}
            >
            </TextArea>
          </div>
          <div className='flex flex-row my-[20px]'>
            <div className='flex flex-col w-1/2 pr-[10px]'>
                <p className='text-left text-[18px] font-semibold text-gray-600 '>Ngày phát hành</p>
                <Input className='rounded-[8px] border-[1px] h-[36px] px-[8px] border-gray-500 hover:shadow' type="text" 
                  name="date" value={input.date || bookDetail.date } onChange={handleChange} disabled={isView}
                />
              </div>
              <div className='flex flex-col w-1/2 pr-[10px]'>
                <p className='text-left text-[18px] font-semibold text-gray-600 '>Số trang</p>
                <Input className='rounded-[8px] border-[1px] h-[36px] px-[8px] border-gray-500 hover:shadow' type="number" 
                  name="numOfPage" value={input.numOfPage || bookDetail.numOfPage} onChange={handleChange} disabled={isView}
                />
              </div>
          </div>
          <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600 '>Thể loại</p>
            <Input className='rounded-[8px] border-[1px] h-[36px] border-gray-500 hover:shadow'  type="text" 
              name="type" value={input.type ||bookDetail.type } onChange={handleChange} disabled={isView}/>
          </div>
          {err&&<div className='flex justify-start'>
            <p className=' text-red-600 '>Yêu cầu nhập đầy đủ thông tin.</p>
          </div>}
        </div>
        <div className='flex flex-col w-1/2 px-[10px] max-w-[620px]'>
        <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600 '>Ảnh bìa</p>
            <form>
                <Input  type="file" name="file"  onChange={onChangePicture} disabled={isView}/>
                <div className="flex   object-cover justify-center ">
                  <Image preview={false} src={imgData} />
                </div>
            </form>
          </div>
        </div>
      </div>
     
      {!isView&& !isEdit&&<div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleAddBookCheck(input)}>Add   {loading&&<Spin indicator={antIcon}/>}</button>
      </div>}
      {isView&& !isEdit&&<div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleEdit()}>Edit</button>
      </div>}
      { isEdit&&<div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[20px]' onClick={()=>handleSave(input)}>Save   {loading&&<Spin indicator={antIcon}/>}</button>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-red-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleCancelFix()}>Cancel</button>
      </div>}
    </div>
  )
}

export default BookDetails
import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined, HomeOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { Image } from 'antd';
import notificationImg from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import { getIsLock } from '../features/featuresHome/HomeSlice';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { notification, } from 'antd';
import { Rate } from 'antd';
const { TextArea } = Input;


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const antIconPage = <LoadingOutlined style={{ fontSize: 240 }} spin />
const openNotification = (placement, action) => {
  notification.info({
    message: `${action} sách thành công.`,
    description:
      '',
    placement,
  });
};
function BookDetails() {
  const [input, setInput] = useState({});
  const [inputCmt, setInputCmt] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [err, setErr] = useState(false);
  const [onEdit, setonEdit] = useState(true);

  const handleChange = e => {
    if(e.target.name =='numOfPage'){
      setInput(prevState => ({ ...prevState, [e.target.name]: Number(e.target.value) }))
    }
    else if(e.target.name =='amount'){
      setInput(prevState => ({ ...prevState, [e.target.name]: Number(e.target.value) }))
    }else{
      setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }
  }
  const handleChangeComment = e => setInputCmt(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  const dispatch= useDispatch()
  const navigate = useNavigate();
  // const bookDetail = useSelector((state) => state.home.bookDetail)
  // const isView = useSelector((state) => state.home.isLock)
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [bookDetail, setBookDetail] = useState({});
  const [isView, setIsView] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [count, setCount] = useState();
  console.log(bookDetail)
  const token= localStorage.getItem('token')
  useEffect(() => {
    const token= localStorage.getItem('token')
    if(!token){
      navigate('/Login')
    }
  }, [])

  useEffect(() => {
    const role= localStorage.getItem('role')
    if(role=='admin'){
      setIsAdmin(true)
    }
  }, [])

  const params = useParams();
  useEffect(() => {
    if(params.id){
      setIsView(true)
            }
  }, [params])

  const handleGetDataDetail=async()=>{
    setLoadingPage(true)
    axios.get(`http://localhost:3000/book/${params.id}`)
    .then(function (response) {
      // handle success
      setLoadingPage(false)
      console.log(response)
      setBookDetail(response.data)
    .catch(function (error) {
        // handle error
        console.log(error);
        
    })
  })
  }
  useEffect(() => {
    if(params.id){
      handleGetDataDetail()
            }
  }, [])
  useEffect(() => {
    if(onEdit){
      setInput({author: bookDetail.author,
                date:bookDetail.date,
                decription:bookDetail.decription,
                numOfPage: bookDetail.numOfPage,
                title: bookDetail.title,
                category: bookDetail.category,
         
                amount: bookDetail.amount
              })
            }
  }, [isEdit])

  useEffect(() => {
    if(isView){
      setImgData(bookDetail.image.url)
    }
  }, [bookDetail])
 
  const handleLogout=()=>{
    localStorage.clear();
    navigate('/Login')
    window.location.reload();
  }


 

console.log(input)

const handleEdit=()=>{
  setIsView(false)
  setIsEdit(true)
}
const handleCancelFix=()=>{
  setIsView(true)
  setonEdit(true)
  setIsEdit(false)
  setImgData(bookDetail.image.url)
  setInput({author: bookDetail.author,
    date:bookDetail.date,
    decription:bookDetail.decription,
    numOfPage: bookDetail.numOfPage,
    title: bookDetail.title,
    category: bookDetail.category,
    image:  bookDetail.image.url,
    amount: bookDetail.amount
  })

}
const handleSave= async (data)=>{
  setLoading(true)
  try {
    const { data: res } = await axios.put(`http://localhost:3000/book/${bookDetail.id}`, data,{headers: { Authorization: `Bearer ${token}` }});
    console.log(res)
    if(res.success){
      setLoading(false)
      setIsView(true)
      setonEdit(false)
      setIsEdit(false)
      // alert('sửa sách thành công')
      openNotification('top','Sửa')
    }
} catch (error) {
    console.error(error);
    setLoading(false)
}
  
}
  const handleAddBook=async (data)=>{ 
    console.log("input:",data)
    let formData = new FormData();
    formData.append('image', picture)
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('category', data.category);
    formData.append('date', data.date);
    formData.append('numOfPage', data.numOfPage);
    formData.append('decription', data.decription);
    formData.append('amount', data.amount);
    try {
      const { data: res } = await axios.post('http://localhost:3000/book', formData, {headers: { Authorization: `Bearer ${token}` }});
      console.log(res)
      if(res.success){
        setLoading(false)
        // alert('thêm sách thành công')
        openNotification('top','Thêm')
        navigate('/')
        
      }else{
        alert('có lỗi xảy ra')
        setLoading(false)
      }
  } catch (error) {
      console.error(error);
      setLoading(false)
  }
  }
  const handleAddBookCheck=(data)=>{
   
    if(input.title && input.author && input.decription && input.date && input.numOfPage && input.category && input.amount ){
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

  // const onChangePicture = e => {
  //   if (e.target.files[0]) {
      
  //     setPicture(e.target.files[0]);
  //     const reader = new FileReader();
      
  //     reader.addEventListener("load", () => {
  //       setImgData(reader.result);
  //       setInput(prevState => ({ ...prevState, urlImage : reader.result }))
  //     });
  //     reader.readAsDataURL(e.target.files[0]);
      
    
  //   }
    
  // };
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

  const handleVote=(count)=>{
   setCount(count)
  }

  return (
    <div className='flex flex-col pb-[50px]'>
      <div className='fixed w-full bg-white shadow-md z-10'>
        <div className='flex justify-between py-[8px] px-[8px]  border-b-[1px] '>
          <div className='py-[8px] ml-[10px]'>
              <HomeOutlined style={{ fontSize: '25px',  }} onClick={()=>handleBack()}/>          
          </div>
          <div className='flex flex-row items-end w-[180px] h-[45px]'>
            <div className='flex flex-row items-center justify-center mx-[4px] mb-[10px]'>
              <img className='w-[24px] ' src={notificationImg} alt="" />
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
                <img className='w-[24px] cursor-pointer' src={logout} alt="" />
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
      {!loadingPage&&<div className='flex flex-row px-[24px] w-full justify-center'>
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
              <Input className=' h-[36px] hover:shadow' type="text" 
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
            name="decription" value={input.decription || bookDetail.decription} onChange={handleChange}
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
              name="category" value={input.category ||bookDetail.category } onChange={handleChange} disabled={isView}/>
          </div>
          <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600 '>Số lượng</p>
            <Input className='rounded-[8px] border-[1px] h-[36px] border-gray-500 hover:shadow'  type="number" 
              name="amount" value={input.amount ||bookDetail.amount } onChange={handleChange} disabled={isView}/>
          </div>
          
          {err&&<div className='flex justify-start'>
            <p className=' text-red-600 '>Yêu cầu nhập đầy đủ thông tin.</p>
          </div>}
        </div>
        <div className='flex flex-col w-1/2 px-[10px] max-w-[620px]'>
          <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600 '>Ảnh bìa</p>
            <form className='flex flex-col justify-center items-center'>
                <input className='overflow-hidden opacity-0 w-[1px] h-[1px]' type="file" id='file'  onChange={onChangePicture} disabled={isView} accept=""/>
                {isAdmin&&<div className='w-[170px] border-[1px] mb-[20px] cursor-pointer'>
                  <label htmlFor="file" className={isView&&'opacity-50 flex flex-row'||'opacity-100 cursor-pointer flex flex-row'}>
                    <p className='mx-[10px] pr-[10px] my-auto'>Upload Image</p>
                    <UploadOutlined style={{ fontSize: 34 }} />
                  </label>
                </div>}
                <div className="flex  justify-center ">
                  <Image  src={imgData} />
                </div>
            </form>
          </div>
        </div>
      </div>}
      <div>
        {loadingPage&&<Spin tip="Loading..." indicator={antIconPage}/>}
      </div>
      {!loadingPage&&<div>
        {!isView&& !isEdit&&<div className='flex justify-end'>
          <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleAddBookCheck(input)}>Add   {loading&&<Spin indicator={antIcon}/>}</button>
        </div>}
        {isView&& !isEdit&& isAdmin&&<div className='flex justify-end'>
          <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleEdit()}>Edit</button>
        </div>}
        { isEdit&&<div className='flex justify-end'>
          <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[20px]' onClick={()=>handleSave(input)}>Save   {loading&&<Spin indicator={antIcon}/>}</button>
          <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-red-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleCancelFix()}>Cancel</button>
        </div>}
      </div>}
      <div className='flex flex-row px-[24px] w-full justify-center'>
        <div className='flex flex-col my-[20px] w-[1240px] justify-center'>
          <p className='text-left text-[18px] font-semibold text-gray-600 '>Đánh giá </p>
          <div>
            <Rate allowHalf onChange={(count)=>handleVote(count)} />
            </div>
          <Input className='' type='text' name='comment'value={inputCmt.comment } onChange={handleChangeComment}></Input>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
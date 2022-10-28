import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd';
import 'antd/dist/antd.css';
import { Modal, Upload } from 'antd';
import notification from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import { getIsLock } from '../features/featuresHome/HomeSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  const { TextArea } = Input;

function BookDetails() {
  const [input, setInput] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [err, setErr] = useState(false);
  const [onEdit, setonEdit] = useState(true);

  const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const bookDetail = useSelector((state) => state.home.bookDetail)
  const isView = useSelector((state) => state.home.isLock)
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
      setFileList([
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: bookDetail.urlImage,
        },
      ])
    }
  }, [])
 
  const handleLogout=()=>{
    localStorage.clear();
    
    window.location.reload();
  }


  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChangeimg = async({ fileList: newFileList }) => {
    
    setFileList(newFileList)
    const file=newFileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log(file.preview)
    setInput(prevState => ({ ...prevState, urlImage : file.preview }))
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

console.log(input)

const handleEdit=()=>{
  dispatch(getIsLock(false))
  setIsEdit(true)
}
const handleCancelFix=()=>{
  dispatch(getIsLock(true))
  setonEdit(true)
  setIsEdit(false)
}
const handleSave= async (data)=>{
  try {
    const { data: res } = await axios.put(`https://app-bookss.herokuapp.com/api/update-book/${bookDetail._id}`, data);
    console.log(res)
    if(res.success){
      alert('sửa sách thành công')
    }
} catch (error) {
    
    console.error(error);
}
  dispatch(getIsLock(true))
  setonEdit(false)
  setIsEdit(false)
}
  
  const handleAddBook=async (data)=>{ 
    try {
      const { data: res } = await axios.post('https://app-bookss.herokuapp.com/api/add-book', data);
      console.log(res)
      if(res.success){
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
      console.log('test')
      setErr(false)
      handleAddBook(data)

    }
    else {
      setErr(true)
    }
  }
  return (
    <div className='flex flex-col pb-[50px]'>
      <div className='flex justify-end mt-[8px] mx-[8px]'>
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
      <div className='flex flex-col items-center justify-center'>
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
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChangeimg}
              disabled={isView}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </div>
      </div>
     
      {!isView&& !isEdit&&<div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleAddBookCheck(input)}>Add</button>
      </div>}
      {isView&& !isEdit&&<div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleEdit()}>Edit</button>
      </div>}
      { isEdit&&<div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[20px]' onClick={()=>handleSave(input)}>Save</button>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-red-500 text-[16px] text-white font-semibold mr-[50px]' onClick={()=>handleCancelFix()}>Cancel</button>
      </div>}
    </div>
  )
}

export default BookDetails
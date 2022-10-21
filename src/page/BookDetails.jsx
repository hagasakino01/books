import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Modal, Upload } from 'antd';
import notification from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function BookDetails() {
  const [input, setInput] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  const bookDetail = useSelector((state) => state.home.bookDetail)
  console.log(bookDetail)
  const handleLogout=()=>{
    localStorage.clear();
    
    window.location.reload();
  }
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChangeimg = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    setInput(prevState => ({ ...prevState, newFileList }))
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


  
  return (
    <div className='flex flex-col'>
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
              <input className='rounded-[8px] border-[1px] h-[36px] px-[8px] border-gray-500 hover:shadow' type="text" 
                name="title" value={input.title || ''} onChange={handleChange}
              />
            </div>
            <div className='flex flex-col w-1/2 pr-[10px]'>
              <p className='text-left text-[18px] font-semibold text-gray-600 '>Tác giả</p>
              <input className='rounded-[8px] border-[1px] h-[36px] px-[8px] border-gray-500 hover:shadow' type="text" 
                name="author" value={input.author || ''} onChange={handleChange}
              />
            </div>
          </div>
          <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600'>Mô tả về sách</p>
            <textarea
            className=" w-full px-[8px] rounded-2xl border-gray-500 border py-2  hover:shadow"
            rows={6}
            cols={80}
            id=""
            placeholder=""
            name="detail" value={input.detail || ''} onChange={handleChange}
            >
            </textarea>
          </div>
          <div className='flex flex-row my-[20px]'>
            <div className='flex flex-col w-1/2 pr-[10px]'>
                <p className='text-left text-[18px] font-semibold text-gray-600 '>Ngày phát hành</p>
                <input className='rounded-[8px] border-[1px] h-[36px] px-[8px] border-gray-500 hover:shadow' type="date" 
                  name="date" value={input.date || ''} onChange={handleChange}
                />
              </div>
              <div className='flex flex-col w-1/2 pr-[10px]'>
                <p className='text-left text-[18px] font-semibold text-gray-600 '>Số trang</p>
                <input className='rounded-[8px] border-[1px] h-[36px] px-[8px] border-gray-500 hover:shadow' type="number" 
                  name="numOfPage" value={input.numOfPage || ''} onChange={handleChange}
                />
              </div>
          </div>
          <div className='flex flex-col my-[20px]'>
            <p className='text-left text-[18px] font-semibold text-gray-600 '>Thể loại</p>
            <select className='rounded-[8px] border-[1px] h-[36px] border-gray-500 hover:shadow'  id="" name="type" value={input.type || ''} onChange={handleChange}>
              <option selected disabled>chọn thể loại</option>
              <option value="SGK">SGK</option>
              <option value="Trinh tham">trinh tham</option>
              <option value="kinh di">kinh di</option>
            </select>
          </div>
          
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
      <div className='flex justify-end'>
        <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold mr-[50px]'>add</button>
      </div>
    </div>
  )
}

export default BookDetails
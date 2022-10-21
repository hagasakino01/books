import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [err, setErr] = useState(false);
  const [errPass, setErrPass] = useState(false);
  const [errValue, setValue] = useState(false);
  const [input, setInput] = useState({});
  console.log(input)
  const handleChange = e => setInput(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  const navigate = useNavigate();
  const handleCreateAccOk=async (data)=>{ 
    try {
      const { data: res } = await axios.post('https://app-bookss.herokuapp.com/api/register', data);
      console.log(res)

     if(res.success ) {
      console.log('ok')
          alert('Đăng Ký thành công')
          navigate('/login') 
     }else(
     setErr(true)
     )
    
  } catch (error) {
      
      console.error(error);
  }
  }
  const handleCreateAcc=(data)=>{
    setErrPass(false)
    setErr(false)
    setValue(false)
    if(input.name && input.email && input.username && input.password && input.repassword ){
      console.log('test')
      if(input.password !== input.repassword){
        setErrPass(true)
      }
      else{
        handleCreateAccOk(data)
      }
    }
    else {
      setValue(true)
    }
  }
  return (
    <div className='flex justify-center items-center w-full '>
      <div className='flex flex-col w-[720px] h-[850px] rounded-t-[8px] border-[2px] drop-shadow-xl items-center my-[40px]'>
        <div className='flex w-[720px] h-[80px] items-center justify-center bg-indigo-700 rounded-t-[8px] '>
          <p className='text-white rounded-t text-[28px] font-semibold '>Tạo tài khoản mới</p>
        </div>
        <div className='flex flex-col w-[580px] items-start my-[16px]'>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Email</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Email' type="email" 
              name="email" value={input.email || ''} onChange={handleChange}
            />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Tên</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Tên' type="text" 
              name="name" value={input.name || ''} onChange={handleChange}
            />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Tên đăng nhập</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Tên đăng nhập' type="text" 
              name="username" value={input.username || ''} onChange={handleChange}
            />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Mật khẩu</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Mật khẩu' type="password" 
              name="password" value={input.password || ''} onChange={handleChange}
            />
          </div>
          <div className='flex flex-col items-start mb-[20px]'>
            <p className='my-[18px] text-[18px] text-sky-700'>Nhập lại Mật khẩu</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Mật khẩu' type="password" 
              name="repassword" value={input.repassword || ''} onChange={handleChange}
            />
          </div>
          {err&&<div>
            <p className=' text-red-600 '>Tên đăng nhập đã tồn tại.</p>
          </div>}
          {errPass&&<div>
            <p className=' text-red-600 '>mật khẩu không trùng khớp.</p>
          </div>}
          {errValue&&<div>
            <p className=' text-red-600 '>Yêu cầu nhập đầy đủ thông tin.</p>
          </div>}
          <div className='mb-[50px] mt-[20px]'>
            <button className='flex flex-col w-[580px] py-[10px] items-center  rounded-[8px] border-[1px] bg-orange-400 text-[18px] font-semibold text-white' onClick={()=>handleCreateAcc(input)} >Tạo tài khoản</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
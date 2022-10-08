import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const err= true
  const navigate = useNavigate();
  const handleCreateAcc=()=>{
    navigate('/Login')
    alert('tọa tài khoản thành công')
  }
  return (
    <div className='flex justify-center items-center w-full '>
      <div className='flex flex-col w-[720px] h-[820px] rounded-t-[8px] border-[2px] drop-shadow-xl items-center my-[40px]'>
        <div className='flex w-[720px] h-[80px] items-center justify-center bg-indigo-700 rounded-t-[8px] '>
          <p className='text-white rounded-t text-[28px] font-semibold '>Tạo tài khoản mới</p>
        </div>
        <div className='flex flex-col w-[580px] items-start my-[16px]'>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Email</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Email' type="email" />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Tên</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Tên' type="text" />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Tên đăng nhập</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Tên đăng nhập' type="text" />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Mật khẩu</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Mật khẩu' type="password" />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Nhập lại Mật khẩu</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Mật khẩu' type="password" />
          </div>
          {!err&&<div>
            <p className='mt-[10px] text-red-600 '>Tên đăng nhập đã tồn tại.</p>
          </div>}
          {!err&&<div>
            <p className='mt-[10px] text-red-600 '>mật khẩu không trùng khớp.</p>
          </div>}
          <div className='my-[50px]'>
            <button className='flex flex-col w-[580px] py-[10px] items-center  rounded-[8px] border-[1px] bg-orange-400 text-[18px] font-semibold text-white' onClick={()=>handleCreateAcc()} >Tạo tài khoản</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
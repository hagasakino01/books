import React from 'react'
import {  Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate();

  const handleLogin=()=>{
    navigate('/')

  }
  return (
    <div className='flex justify-center items-center w-full h-screen'>
      <div className='flex flex-col w-[720px] h-[520px] rounded-t-[8px] border-[2px] drop-shadow-xl items-center'>
        <div className='flex w-[720px] h-[80px] items-center justify-center bg-indigo-700 rounded-t-[8px]'>
          <p className='text-white rounded-t text-[28px] font-semibold '>Đăng nhập</p>
        </div>
        <div className='flex flex-col w-[580px] items-start my-[16px]'>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Tên đăng nhập</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Tên đăng nhập' type="text" />
          </div>
          <div className='flex flex-col items-start'>
            <p className='my-[18px] text-[18px] text-sky-700'>Mật khẩu</p>
            <input className='w-[580px] h-[50px] px-[24px] rounded-[8px] border-[1px] ' placeholder='Mật khẩu' type="password" />
          </div>
          <div>
            <p className='mt-[10px] text-red-600 '>Tên đăng nhập hoặc mật khẩu không chính xác.</p>
          </div>
            <Link className='my-[10px] hover:text-sky-700' to='/register'>Tạo tài khoản mới</Link>
          <div>
            <button className='flex flex-col w-[580px] py-[10px] items-center  rounded-[8px] border-[1px] bg-orange-400 text-[18px] font-semibold text-white' onClick={()=>handleLogin()}>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact, AgGridReactProps, AgReactUiProps } from 'ag-grid-react';
import { Alert, Button, Space } from 'antd';
import notification from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetail, getIsLock, getIsView, getListBook, getLogin } from '../features/featuresHome/HomeSlice';
import axios from 'axios';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const antIcon = <LoadingOutlined style={{ fontSize: 240 }} spin />
function Home() {
 
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const gridRef = useRef(); 
  const rowData = useSelector((state) => state.home.listBook)
  const [loading, setLoading] = useState(false);
 const defaultCellStyle = {
  fontSize: '14px',
  lineHeight: '18px',
  padding: '16px 0',
  fontWeight: '500',
  color: '#282828',
};
const columnDefs = [
  {
    field: 'stt',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '',
    width: 35,
    suppressMenu: true,
    
  },
  {
    field: 'title',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px' },
    headerName: 'Tiêu đề',
    width: 265,
    
    filter: true,

  },
  {
    field: 'author',
    headerClass: 'header-ag text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'tác giả',
    width: 200,
    filter: true,
    
  },
  {
    field: 'type',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'thể loại',
    width: 150,
    filter: true,
  },
  {
    field: 'date',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'ngày phát hành',
    width: 160,
    filter: true,
  },
  {
    field: 'numOfPage',
    headerClass: 'header-ag text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    headerName: 'số trang',
    width: 100,
    suppressMenu: true,
    
  },
  {
 
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
    width: 200,
    suppressMenu: true,
    cellRenderer: 'actionRerender',
    
  },

];

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true,
    
   }));

 // Example of consuming Grid Event
 
 // Example load data from sever
const handleGetListBook= async ()=>{
  setLoading(true)
  axios.get('https://app-bookss.herokuapp.com/api/get-books')
  .then(function (response) {
    // handle success
    setLoading(false)
    console.log(response)
    dispatch(getListBook(response.data))
  .catch(function (error) {
      // handle error
      console.log(error);
      
  })
})
}
useEffect(() => {
  handleGetListBook()
}, [])
const token= localStorage.getItem('token')

const handleLogout=()=>{
  localStorage.clear();
  console.log(token)
  window.location.reload();
}
const handleLogin=()=>{
  navigate('/login')
}

const handleDelete= async (params)=>{
  setLoading(true)
  console.log(params.data._id)
  await axios.delete(`https://app-bookss.herokuapp.com/api/delete-book/${params.data._id}`)
    .then((res)=> {
      console.log( res )
   
      handleGetListBook()
    }).catch((err)=> {
      console.log(err)
    });
    console.log('ok')
}

const handleDeleteCheck=(params)=>{
  if(window.confirm("Bấm OK để tiếp tục xóa") === true){
    handleDelete(params)
}else{
    console.log('ko xoa')
}
}
const handleViewBook=  (params)=>{
    // handle success
    navigate(`/BookDetails/`+ params.data._id)
}

const handleAddBook=()=>{
  
  dispatch(getIsLock(false))
  dispatch(getBookDetail([]))
  navigate('/BookDetails')
}

  return (
    <div className='flex flex-col w-full items-center justify-center pb-[24px] '>
    <div className='flex flex-col mb-[24px] w-full '>
      <div className='flex justify-end  '>
        {token && 
        <div className='fixed w-full bg-white shadow-md z-10'>
          <div className='flex justify-end py-[8px] px-[8px]  border-b-[1px] '>
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
        </div>}
       {!token && <div>
          <button className='px-[16px] py-[4px]  mx-[8px] border-[2px] border-yellow-500 text-yellow-500 rounded-[8px] text-[18px] font-semibold mt-[20px]' onClick={()=>handleLogin()}>Đăng nhập</button>
        </div>}
      </div>

      <div className='flex flex-col items-center justify-center mt-[80px]'>
        <div className='max-w-[500px]'>
          <p className='text-[60px] font-semibold text-indigo-500 h-[60px] mb-[10px]'>Welcome</p>
          <p className='text-[48px] text-amber-300 '>to your library</p>
        </div>
      </div>
    </div>

    {token && <div className=' flex w-[350px] md:w-[720px] xl:w-[1120px] justify-end my-[16px]'>
      <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold ' onClick={()=>handleAddBook()}>Thêm sách</button>
    </div>}
    {!loading&&<div className="ag-theme-alpine w-[350px] md:w-[720px] xl:w-[1120px] h-[600px] mx-[20px]" >
      <AgGridReact
          ref={gridRef} 

          rowData={rowData} 

          gridOptions={{
            columnDefs: columnDefs,
            frameworkComponents: {
              actionRerender: (params) => {
                return (
                  <div>
                    {token&&<div>
                      <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-yellow-200' onClick={()=>handleViewBook(params)} >Xem </button>
                      <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-red-400' onClick={()=>handleDeleteCheck(params)}>Xóa</button>
                    </div>}
                  </div>
                )
                
              },
            },
          }}
          defaultColDef={defaultColDef} 
          animateRows={true} 
          rowSelection='multiple' 
          suppressAggFuncInHeader={true}
      suppressMovableColumns={true}
      suppressColumnMoveAnimation={true}
      enableServerSideFilter
      rowHeight={50}
     
      suppressContextMenu={true}
      suppressCellSelection={true}
      suppressMenuHide={true}
      suppressRowClickSelection={true}
      scrollbarWidth={0}
      containerStyle={{
        height: 600,
      }}
      pagination={true}
      paginationPageSize={20}
      cacheBlockSize={20}
          />
    </div>}
    <div>
      {loading&&<Spin tip="Loading..." indicator={antIcon}/>}
    </div>
  </div>
  );
 };
export default Home
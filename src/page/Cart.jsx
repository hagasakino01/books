import React, { useEffect, useMemo, useRef, useState } from 'react'

import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import { notification, } from 'antd';

const openNotification = (placement, action ,modal) => {
  notification.info({
    message: `${action} thành công. ${modal}`,
    description:
      '',
    placement,
  });
};
function Cart() {
    const [rowData, setRowData] = useState([]);
    const [dataCart, setDataCart] = useState([]);
 
    const gridRef = useRef(); 
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
          field: 'category',
          headerClass: 'header-ag header-text-center',
          cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
          headerName: 'thể loại',
          width: 150,
          filter: true,
        },
        {
          field: 'amount',
          headerClass: 'header-ag header-text-center',
          cellStyle: { ...defaultCellStyle, textAlign: 'left', paddingLeft:'18px'},
          headerName: 'số lượng',
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
    const navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.clear();
        navigate('/Login')
        window.location.reload();
    }
    
    
    
    const token= localStorage.getItem('token')
    const userId= localStorage.getItem('userid')
    const fullname= localStorage.getItem('fullname')
    const handleCart=()=>{
        navigate('/cart')
      }
    const handleBack=()=>{
        navigate('/')
      }

     const handleSetDataRow = ()=>{
        console.log(dataCart)
        const newData= dataCart.map((e)=>(
            {
                amount:e.amount,
                idCart:e.id,
                title:e.book.title,
                author:e.book.author,
                category:e.book.category,
                numOfPage:e.book.numOfPage,
                idBook:e.book.id,
            }
        ))
        console.log(newData)
        setRowData(newData)
     }
      const handleGetListBook= async ()=>{
     
        axios.get(`http://localhost:3000/order/${userId}`,{headers: { Authorization: `Bearer ${token}` }})
        .then(function (response) {
          // handle success
            console.log(response.data)
            setDataCart(response.data)
            
            
        .catch(function (error) {
            // handle error
            console.log(error); 
        })
      })
      }
      useEffect(() => {
        handleGetListBook()
      }, [])
      useEffect(() => {
        handleSetDataRow()
      }, [dataCart])


      const handleViewBook=  (params)=>{
        // handle success
        navigate(`/BookDetails/`+ params.data.idBook)
       
    }
    const handleDelete= async (params)=>{
     const payload={
      bookId: params.data.idBook,
      orderId: params.data.idCart,
      amount: params.data.amount,
     }
      console.log(payload)
      await axios.delete(`http://localhost:3000/order/${params.data.idCart}`, {headers: { Authorization: `Bearer ${token}`}})
        .then((res)=> {
          console.log( res )
          openNotification('top','Xóa đặt sách','')
          handleGetListBook()
        }).catch((err)=> {
          console.log(err)
          handleGetListBook()
        });
        console.log('ok')
    }
    
  return (
    <div className='flex flex-col w-full items-center  pb-[24px] '>
     <div className='fixed w-full bg-white shadow-md z-10'>
        <div className='flex justify-between py-[8px] px-[8px]  border-b-[1px] '>
          <div className='py-[8px] ml-[10px]'>
              <HomeOutlined style={{ fontSize: '25px',  }} onClick={()=>handleBack()}/>          
          </div>
          <div className='flex flex-row items-end w-[200px] h-[45px]'>
            <div className='flex flex-row items-center justify-center mx-[4px] mb-[10px]'>
                <ShoppingCartOutlined style={{fontSize: "25px"}} onClick={()=>handleCart()}/>
              </div>
            <div className='flex flex-row items-center'>
              <div className='w-[42px] h-[42px] rounded-[50px] mx-[4px]'>
                <img className='w-[42px] h-[42px] rounded-[50px]' src={thangBang} alt="" />
              </div>
              <div className=' mx-[4px]'>
                <p className='text-[14px] text-[#7D7D7D] mb-0'>Xin chào</p>
                <p className='text-[14px] text-[#EA6200] mb-0'>{fullname}</p>
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
          <p className='text-[48px] text-amber-300 '>to your cart</p>
        </div>
      </div>
      <div className="ag-theme-alpine w-[350px] md:w-[720px] xl:w-[1120px] h-[600px] mx-[20px]" >
      <AgGridReact
          ref={gridRef} 

          rowData={rowData} 

          gridOptions={{
            columnDefs: columnDefs,
            frameworkComponents: {
              actionRerender: (params) => {
                return (
                  <div>
                    <div>
                      <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-yellow-200' onClick={()=>handleViewBook(params)} >Xem </button>
                      <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-red-400' onClick={()=>handleDelete(params)} >Hủy đơn mua </button>
                    </div>
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
    </div>
    </div>
  )
}

export default Cart
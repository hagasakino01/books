import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AgGridReact, AgGridReactProps, AgReactUiProps } from 'ag-grid-react';
import notification from './../img/notification.png'
import thangBang from './../img/thang.jpg'
import logout from './../img/logout.png'
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css'; 
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const gridRef = useRef(); 
 const [rowData, setRowData] = useState(); 

 
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
    width: 80,
    suppressMenu: true,
    
  },
  {
    field: 'make',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '1',
    width: 200,
    suppressMenu: true,
  },
  {
    field: 'model',
    headerClass: 'header-ag text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '2',
    width: 200,
    suppressMenu: true,
    
  },
  {
    field: 'price',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '3',
    width: 200,
    suppressMenu: true,
  },
  {
    field: 'make',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '4',
    width: 200,
    suppressMenu: true,
  },
  {
    field: 'model',
    headerClass: 'header-ag text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '5',
    width: 200,
    suppressMenu: true,
    
  },
  {
    field: '123',
    headerClass: 'header-ag header-text-center',
    cellStyle: { ...defaultCellStyle, textAlign: 'left' },
    headerName: '',
    width: 200,
    suppressMenu: true,
    cellRenderer: 'actionRerender',
  },

];

 // DefaultColDef sets props common to all Columns
 const defaultColDef = useMemo( ()=> ({
     sortable: true
   }));

 // Example of consuming Grid Event
 const cellClickedListener = useCallback( event => {
   console.log('cellClicked', event);
 }, []);

 // Example load data from sever
 useEffect(() => {
   fetch('https://www.ag-grid.com/example-assets/row-data.json')
   .then(result => result.json())
   .then(rowData => setRowData(rowData))
 }, []);

const [isLogin,setIsLogin]=useState(true)
const handleLogout=()=>{
  navigate('/login')
}
  return (
    <div className='flex flex-col w-full items-center justify-center pb-[24px] '>
    <div className='flex flex-col mb-[24px] w-full '>
      <div className='flex justify-end mt-[8px] mx-[8px]'>
        {isLogin && <div className='flex flex-row items-end w-[180px] h-[45px]'>
          <div className='flex flex-row items-center justify-center mx-[4px] mb-[10px]'>
            <img className='w-[24px]  ' src={notification} alt="" />
          </div>
          <div className='flex flex-row items-center'>
            <div className='w-[42px] h-[42px] rounded-[50px] mx-[4px]'>
              <img className='w-[42px] h-[42px] rounded-[50px]' src={thangBang} alt="" />
            </div>
            <div className=' mx-[4px]'>
              <p className='text-[14px] text-[#7D7D7D]'>Xin chào</p>
              <p className='text-[14px] text-[#EA6200]'>Admin001</p>
            </div>
            <div onClick={()=>handleLogout()}>
              <img className='w-[24px] cursor-pointer' src={logout}  alt="" />
            </div>
          </div>
        </div>}
       {!isLogin && <div>
          <button className='px-[16px] py-[4px]  mx-[8px] border-[2px] border-yellow-500 text-yellow-500 rounded-[8px] text-[18px] font-semibold'>Đăng nhập</button>
        </div>}
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='max-w-[500px]'>
          <p className='text-[60px] font-semibold text-indigo-500 h-[60px]'>Welcome</p>
          <p className='text-[48px] text-amber-300 '>to your library</p>
        </div>
      </div>
    </div>

    <div className=' flex w-[350px] md:w-[720px] xl:w-[1280px] justify-end my-[16px]'>
      <button className='border-[1px] border-cyan-900 px-[16px] py-[4px] rounded-[4px] bg-green-500 text-[16px] text-white font-semibold '>Thêm sách</button>
    </div>
    <div className="ag-theme-alpine w-[350px] md:w-[720px] xl:w-[1280px] h-[600px] mx-[20px]" >
      <AgGridReact
          ref={gridRef} 

          rowData={rowData} 

          gridOptions={{
            columnDefs: columnDefs,
            frameworkComponents: {
              actionRerender: (params) => {
                if(isLogin){return (
                  <div>
                    <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-yellow-200'>Xem</button>
                    <button className='border-neutral-400 border-[1px] mx-[8px] px-[8px] pb-[2px] bg-red-400'>Xóa</button>
                  </div>
                )
                }
              },
            },
          }}
          defaultColDef={defaultColDef} 

          animateRows={true} 
          rowSelection='multiple' 

          onCellClicked={cellClickedListener} 
          suppressAggFuncInHeader={true}
      suppressMovableColumns={true}
      suppressColumnMoveAnimation={true}

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
  );
 };
export default Home
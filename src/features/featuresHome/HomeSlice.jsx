import { createSlice } from "@reduxjs/toolkit";


const initialState={
    listBook:[],
    bookDetail:[],
    isView:false
}
export const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{
        getListBook:(state, action)=>{
            state.listBook=action.payload
        },
        getBookDetail:(state, action)=>{
            state.bookDetail=action.payload
        },
        getIsView:(state, action)=>{
            state.isView=action.payload
        },
        
    }

})
export const { getListBook,getBookDetail,getIsView}= homeSlice.actions
export default homeSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


const initialState={
    listBook:[],
    bookDetail:[],
    isLock:false
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
        getIsLock:(state, action)=>{
            state.isLock=action.payload
        },        
    }

})
export const { getListBook,getBookDetail,getIsLock}= homeSlice.actions
export default homeSlice.reducer;
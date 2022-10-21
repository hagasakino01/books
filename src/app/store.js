import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/featuresHome/HomeSlice'


export const store = configureStore({
    reducer: {
        
        home:homeReducer,
        
    },
});
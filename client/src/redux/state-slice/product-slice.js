import {createSlice} from "@reduxjs/toolkit";
export const productslice = createSlice({
    name:"product",
    initialState:{
        Total:[],
        ALLProduct:[],
    },
    reducers:{
        setTotal:(state, action)=>{
            state.Total= action.payload;
        },
        setALLProduct:(state,action)=>{
            state.ALLProduct= action.payload
        }
    }
})

export const {setTotal, setALLProduct } = productslice.actions;
export default productslice.reducer;
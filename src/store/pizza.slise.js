import { createSlice } from "@reduxjs/toolkit";


const pizzaSlice = createSlice({
    name:"pizza",
    initialState:{
        value:0,
        count: 0,
    },
    reducers:{
        addSum:(state,action)=>{
            state.value+= action.payload;
            state.count+=1;
        },
        clearSum:state=>{
            state.value = 0;
            state.count = 0;
        }
    }
})
export default pizzaSlice.reducer;
export const {addSum,clearSum} = pizzaSlice.actions;
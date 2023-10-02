import { configureStore } from "@reduxjs/toolkit";
import pizzaSlice from "./pizza.slise";

const store = configureStore({
    reducer:{
        pizza: pizzaSlice
    }
})
export default store;
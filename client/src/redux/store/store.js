import {configureStore} from "@reduxjs/toolkit";
import settingReducer from "../state-slice/setting-slice";
import productReducer from "../state-slice/product-slice";


export default configureStore({
    reducer:{
        settings:settingReducer,
        product:productReducer
    }

})
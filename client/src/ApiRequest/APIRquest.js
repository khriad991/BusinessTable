import store from "../redux/store/store";
import {HideLoader, ShowLoader} from "../redux/state-slice/setting-slice";
import axios from "axios";
import {setALLProduct, setTotal} from "../redux/state-slice/product-slice";
import {ErrorToast} from "../helper/tost";


const BaseURL = 'http://localhost:5000/api/v1'

export async function GetProductList(pageNo, perPage , searchKeyword){
    let URL = `${BaseURL}/productList/${pageNo}/${perPage}/${searchKeyword}`;

    store.dispatch(ShowLoader())
    try{
         const result = await axios.get(URL);
         store.dispatch(HideLoader());
         if(result.status=== 200 && result.data['status']=== 'success'){

             if(result.data['data'][0]['Rows'].length > 0){
                 store.dispatch(setALLProduct(result.data['data'][0]['Rows']))
                 store.dispatch(setTotal(result.data['data'][0]['Total'][0]['count']))
             }else {
                 store.dispatch(setALLProduct([]))
                 store.dispatch( setTotal(0))
                 ErrorToast("No Data Found")
             }
         }else {
             ErrorToast("Something Went Wrong");
         }
    }catch (e) {
        ErrorToast('SomeThing Weng Wrong')
        store.dispatch(HideLoader())
    }
}
import { takeLatest, call, put } from "redux-saga/effects";
import { REQUEST_ALL_ITEMS, REQUEST_ALL_ITEMS_SUCCESS, UPDATE_ITEM,CREATE_ITEM, DELETE_ITEM } from "../constants/item";
import {LOGIN_SUCCESS} from "../constants/auth";
import {refreshUser} from "../../services/auth.service";
import { requestAllItemsSuccess, setCurrentItem } from "../actions/item";
import {setUser} from "../actions/user";
import { requestItems, updateItem,createItem,deleteItemService } from  "../../services/item.service";

function* updateItemFlow(action) {
    try {
      const item = action.payload.updatedItem;
      const user= action.user;
      const updatedItem = yield call(updateItem, item)
      const payload=yield call(refreshUser,user);
      //console.log(payload);
      yield put(setUser(payload.token, payload.userId, payload.role, payload.exp,payload.username,payload.firstName, payload.lastName,payload.email,payload.phone,payload.address,payload.cart,payload.emailConfirmed,payload.orders));
      yield put({
        type: LOGIN_SUCCESS,
      });
      yield put({type:REQUEST_ALL_ITEMS})
    }catch (error) {
      console.log(error.message);
      console.log(error);
    }
}
function* deleteItemFlow (action){
  try{
    const {deleteItem} = action.payload;
    const response = yield call(deleteItemService,deleteItem);
    console.log(response);
    yield put({type:REQUEST_ALL_ITEMS})
    }catch(error){
    console.log(error)
  }
}
function* createItemFlow (action){
  try{
    const {newItem} = action.payload;
    console.log(newItem);
    const response = yield call (createItem,newItem);
    console.log(response);
    //yield put ()
  }catch(error){
    console.log(error.message);
    console.log(error);
  }
}
function* shoppingPageFlow(action) {
    
    try {

      const responseMessage = yield call(requestItems);
        console.log(responseMessage)
      yield put(requestAllItemsSuccess(responseMessage));
  
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
}

function* shoppingPageWatcher() {
    console.log("shoppingPageWarcher called");
    yield takeLatest(REQUEST_ALL_ITEMS, shoppingPageFlow );
    yield takeLatest(UPDATE_ITEM, updateItemFlow);
    yield takeLatest(CREATE_ITEM,createItemFlow);
    yield takeLatest(DELETE_ITEM,deleteItemFlow);    
}



export default shoppingPageWatcher

import {    take, takeLatest, call, put } from "redux-saga/effects";
import {GET_CURRENT_ORDER,DELETE_ORDER, GET_CURRENT_ORDER_SUCCESS,UPDATE_ORDER,SAVE_CART,CREATE_ORDER,SAVE_ORDER} from "../constants/order";
import {LOGIN_SUCCESS} from "../constants/auth";
import { CREATE_ORDER, SAVE_ORDER, SAVE_CART } from "../constants/order";
import {refreshUser} from "../../services/auth.service";
import {getCurrentOrderApi,getUpdateOrderApi,deleteOrderService,saveCartService,createOrderService} from "../../services/order.service";
import {setCurrentOrder} from "../actions/order";
import {setUser} from "../actions/user";

import { saveCartAction, saveOrderAction } from "../actions/order";

function* createOrderFlow(action) {
  try {
    console.log("In saga -- createOrderFlow action.payload", action.payload)
    const order = action.payload;
    const user = action.user
    console.log("In saga -- createOrderFlow ", order )
    const {orderCreated} = yield call(createOrderService, order)  
    if (orderCreated) {
      user.orders.push(order)
      console.log("User in createOrderFlow", user)
      yield put(setUser(user.token, user.id, user.role, user.exp,user.username,user.firstName,user.lastName,user.email,user.phone,user.address,user.cart,user.emailConfirmed,user.orders));
      if (user.orders){
        const createdOrderIndex = user.orders.length - 1
        yield put(setCurrentOrder(user.orders[createdOrderIndex]));
      }
      yield put({
        type: LOGIN_SUCCESS,
      });
    } 
  //   yield put(setUser(updatedUser))

  }catch (error) {
    console.log(error.message);
    console.log(error);
  }
}

function* getCurrentOrderFlow(action){

    try{
        const orderId= action.payload;
        const order = yield call(getCurrentOrderApi,orderId);
        // console.log(orderId);
        // console.log(order);
        yield put(setCurrentOrder(order));
    }catch(error){
        console.log(error);
        throw error;
    }
}
function* updateOrderFlow(action){
    try{
        const order = action.payload;
        const user= action.user;
        console.log(user);
        const updateOrder = yield call(getUpdateOrderApi,order)
        const payload=yield call(refreshUser,user);
        console.log(payload);
        yield put(setUser(payload.token, payload.userId, payload.role, payload.exp,payload.username,payload.firstName, payload.lastName,payload.email,payload.phone,payload.address,payload.cart,payload.emailConfirmed,payload.orders));
        yield put({
          type: LOGIN_SUCCESS,
        });
    }catch(error){
        console.log(error);
        throw error;
    }
}
function* deleteOrderFlow(action){
    try{
        const deleteOrder= action.payload;
        yield call(deleteOrderService,deleteOrder)
    }catch(error){
        console.log(error);
        throw error;
    }
}


function* saveCartFlow(action) {
    try {
      console.log("In saga -- saveCartFlow ", action)
      const user = action.payload.user;
      const cart = action.payload.cart;
      const {userUpdated, didUserUpdate} = yield call(saveCartService, user, cart)  
      console.log("didUserUpdate", userUpdated)
      if (didUserUpdate) {
        yield put(setUser(user.token, userUpdated.id, userUpdated.role, user.exp,userUpdated.username,userUpdated.firstName,userUpdated.lastName, userUpdated.email,userUpdated.phone,userUpdated.address,userUpdated.cart,userUpdated.emailConfirmed,userUpdated.orders));
        yield put({
          type: LOGIN_SUCCESS,
        });
      } 
    //   yield put(setUser(updatedUser))

    }catch (error) {
      console.log(error.message);
      console.log(error);
    }
}

function* orderWatcher(){
    yield takeLatest(GET_CURRENT_ORDER,getCurrentOrderFlow);
    yield takeLatest(UPDATE_ORDER,updateOrderFlow);
    yield takeLatest(DELETE_ORDER,deleteOrderFlow)
    yield takeLatest(SAVE_CART, saveCartFlow) 
    yield takeLatest(CREATE_ORDER, createOrderFlow) 
}

}
export default orderWatcher;

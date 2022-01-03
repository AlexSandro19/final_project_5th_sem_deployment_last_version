import {GET_CURRENT_ORDER,DELETE_ORDER, GET_CURRENT_ORDER_SUCCESS,UPDATE_ORDER,SAVE_CART,CREATE_ORDER,SAVE_ORDER} from "../constants/order"
export const setCurrentOrder = (order) => {
    // console.log("In the actions - setCurrentItem");
    // console.log(order);
    return {
        type: GET_CURRENT_ORDER_SUCCESS,
        payload: order
    }
} 

export const getCurrentOrder = (orderId) => {
    // console.log("In the actions - setCurrentItem");
    // console.log(orderId);
    return {
        type: GET_CURRENT_ORDER,
        payload: orderId
    }
} 
export const updateOrder = (user,order) =>{
    return{
        type:UPDATE_ORDER,
        payload:order,
        user
    }
}
export const deleteOrder = (order) =>{
    return{
        type:DELETE_ORDER,
        payload:order,
    }
}

export const createOrderAction = (user, order) => {
    console.log("In the actions - createNewOrder", order);
    return {
        type: CREATE_ORDER,
        payload: order, 
        user
    }
}


// export const saveOrderAction = (order) => {
//     console.log("In the actions - saveOrder", order);
//     return {
//         type: SAVE_ORDER,
//         payload: order
//     }
// }

export const saveCartAction = (user, cart) => {
    console.log("In the actions - saveOrder", user, cart);
    return {
        type: SAVE_CART,
        payload: {user, cart}
    }
}
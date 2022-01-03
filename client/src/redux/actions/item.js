import { REQUEST_ALL_ITEMS,DELETE_ITEM, REQUEST_ALL_ITEMS_SUCCESS, SET_CURRENT_ITEM, SET_FILTERED_ITEMS, CREATE_ITEM, UPDATE_ITEM } from "../constants/item";

export const requestAllItemsSuccess = (data) => {
    console.log("In the actions -- requestAllItemsSuccess");
    return {
        type: REQUEST_ALL_ITEMS_SUCCESS,
        message: {
        text: "Successfully seceived all items",
        },
        payload: data,
    };
};

export const requestAllItems = () => {
    console.log("In the actions -- requestAllItems");
    return {
        type: REQUEST_ALL_ITEMS,
        message: "Requesting all items",
    };
};

export const setCurrentItem = (items,item) => {
    console.log("In the actions - setCurrentItem");
    console.log(item);
    return {
        type: SET_CURRENT_ITEM,
        payload: item,
        items: items
    }
} 
export const setFilteredItems = (filteredItems) => {
    console.log("In the actions - setFilteredItems");
    return {
        type: SET_FILTERED_ITEMS,
        payload: filteredItems
    }
} 

export const createItem = (items,newItem) => {
    console.log("In the actions - createItem");
    return {
        type: CREATE_ITEM,
        payload: {items:items,newItem:newItem}
    }
} 
export const deleteItem = (deleteItem) => {
    console.log("In the actions - deleteItem");
    return {
        type: DELETE_ITEM,
        payload: {deleteItem:deleteItem}
    }
} 
export const updateItem = (user,updatedItem) => {
    console.log("In the actions - updateItem", updatedItem);
    return {
        type: UPDATE_ITEM,
        payload: {updatedItem},
        user
    }
} 



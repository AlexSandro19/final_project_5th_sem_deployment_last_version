import React, { useEffect, useCallback } from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, Button, ButtonBase, Paper, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems, getCurrentItem} from "../redux/actions/item"
import ShoppingPageComponent from "../components/ShoppingPageComponent"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import {useLocation} from "react-router-dom"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const useStyles=makeStyles(()=>({
    back:{
        margin:"2%",
        backgroundColor:"#D7CD79",
        flexGrow:2,
        width: '600px',
        height: '100%',
        paddingBottom:"7%",
    },
    card:{
       
        marginTop:"10%",
        marginLeft:"5%",
        width:"90%",
    },

}))

const ItemPage=({items, currentItem, userIsAuthenticated})=> {
    const classes=useStyles();

    const addItemToCart = (item) => {
        console.log(item);

    }

    console.log("In the ItemPage");
    console.log(items);
    console.log(currentItem);
    console.log(currentItem.materials);
    console.log(currentItem.materialArray);
    console.log("userIsAuthenticated: ", userIsAuthenticated);
    return (
        <Paper width="90%">
            <img src={currentItem.picturesArray[0]} alt=""></img>
            <Typography variant="h1">{currentItem.name}</Typography>
            <Typography variant="subtitle1">{currentItem.description}</Typography>
            <Typography variant="body2">Color: ADD COLOR TO FURNITURE</Typography>
            {/* <Typography variant="body2">Suitable for: {currentItem.categories.join(', ')}</Typography>
            <Typography variant="body2">Materials for: {currentItem.materials.join(', ')}</Typography> */}
            <Typography variant="body2">Warranty: {currentItem.hasWarranty ? "Yes" : "No"}</Typography>
            <Typography variant="h5">Price: {currentItem.price}</Typography>
            {userIsAuthenticated ? 
                <Button onClick={() => {addItemToCart(currentItem)}}><Typography style={{textAlign:"center"}} variant="h6">CART <AddShoppingCartIcon fontSize="default"/></Typography></Button>
              : <></>
            }

       
            </Paper>
         
    )
}

const mapStateToProps = (state) => {
    return {
        items: state.items.items,
        currentItem: state.items.currentItem,
        userIsAuthenticated: state.user.isAuthenticated,
    };
};
    
export default connect(mapStateToProps,{})(ItemPage)
import React, { useEffect, useCallback } from "react";
import { Card, CardActionArea, CardContent, Grid, Box, Typography, ButtonBase, } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems} from "../redux/actions/item"
import OrderDetailsComponent from "../components/OrderDetailsComponent"
import ViewOrderPage from "./ViewOrderPage"
import {Loader} from "../components/Loader"
import Item from "../components/Item"; 
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

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

const OrderConfirmation=({user, currentOrder})=> {

    if (!currentOrder){
        <Loader></Loader>
    }
    return (
        <>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h2">Thank you!. The order is confirmed</Typography>
        </Grid>
        <Grid item xs={12}>
            <ViewOrderPage></ViewOrderPage>
        </Grid>
        </Grid>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        currentOrder: state.order.currentOrder, 
        user: state.user,
    };
};
    
export default connect(mapStateToProps,{})(OrderConfirmation)
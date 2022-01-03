import { connect } from "react-redux";
import {useState} from "react";
import { EditOrder } from "../components/EditOrder";
import {Loader} from "../components/Loader";
import {updateOrder} from "../redux/actions/order";
const EditOrderPage=({user,currentOrder,updateOrder})=>{
    console.log(currentOrder)

   
    if(currentOrder === null){
        return(
            <Loader></Loader>
        )
    }
    return(
        <EditOrder user={user} updateOrder={updateOrder} currentOrder={currentOrder}>
        </EditOrder>
    )


}

const mapStateToProps = (state) => {
    return {
        currentOrder:state.order.currentOrder,
        user:state.user
    };
  };
  
export default connect(mapStateToProps,{updateOrder})(EditOrderPage)
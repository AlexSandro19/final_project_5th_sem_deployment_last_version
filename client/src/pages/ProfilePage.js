import { connect } from "react-redux";
import { Profile } from "../components/Profile";
import { useHistory } from "react-router-dom";
import {useState} from "react";
import { DeleteDialog } from "../components/DeleteDialog";
import {setCurrentItem,deleteItem} from "../redux/actions/item"
import { getCurrentOrder,deleteOrder } from "../redux/actions/order";
const ProfilePage=({user,items,currentItem,currentOrder,setCurrentItem,getCurrentOrder,deleteItem,deleteOrder})=>{
    const history = useHistory();
    const [form, setForm] = useState({
      email: user.email,
      username:user.username,
      firstName:user.firstName,
      lastName:user.lastName,
      password:"",
      phone:user.phone,
      address:user.address,  
    });
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    const sendProfileUpdateForm= (e)=>{
      e.preventDefault();
  
      //registerUser(form);
      history.push("/");
    }
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOrderOpen, setDeleteOrderOpen] = useState(false);
    const handleDeleteItemOpen = (item) => {
      setCurrentItem(items,item);
      setModalOpen(true);
      };
      const handleDeleteOrderOpen = (orderId) => {
        getCurrentOrder(orderId);
        setDeleteOrderOpen(true);
      };
      const submitDeleteOrder = ()=>{
        deleteOrder(currentOrder);
        setDeleteOrderOpen(false);
      }
      const submitDeleteItem = ()=>{
        deleteItem(currentItem);
        setModalOpen(false);
      }
      const handleClose = () => {
        setModalOpen(false);
        setDeleteOrderOpen(false);
      };
    
    return(
        <div>
        <Profile getCurrentOrder={getCurrentOrder} setCurrentItem={setCurrentItem} handleDeleteOrderOpen={handleDeleteOrderOpen}  handleDeleteItemOpen={handleDeleteItemOpen} items={items} user={user} form={form} sendProfileUpdateForm={sendProfileUpdateForm} changeHandler={changeHandler}>
        
        </Profile>
      
        <DeleteDialog text={"Item"} deleteFunction={submitDeleteItem} modalOpen={modalOpen} handleClose={handleClose}></DeleteDialog>
        <DeleteDialog text={"Order"} deleteFunction={submitDeleteOrder} modalOpen={deleteOrderOpen} handleClose={handleClose}></DeleteDialog>
        
        </div>
        )


}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        items:state.items.items,
        currentItem:state.items.currentItem,
        currentOrder:state.order.currentOrder,
    };
  };
  
export default connect(mapStateToProps,{setCurrentItem,getCurrentOrder,deleteItem,deleteOrder})(ProfilePage)
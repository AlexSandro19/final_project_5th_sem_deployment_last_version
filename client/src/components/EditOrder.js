import {Box,TextField,Typography,Button} from "@mui/material";
import {useState} from "react";
import { useHistory } from "react-router-dom";
export const EditOrder=({user,currentOrder,updateOrder})=>{
    const history=useHistory()
    const format=(date)=>{
        const formattedDate= date.split("-")[2]+"-"+ date.split("-")[1]+"-"+ date.split("-")[0];
        //console.log(formattedDate);
        return formattedDate
    }
    const [form, setForm] = useState({
      ...currentOrder
    });
 
    //console.log(form);
    //console.log(currentOrder);
    const handleSubmit = (e) => { // e = event
        e.preventDefault();
        console.log(form)
        updateOrder(user,form);
        // console.log(currentId, postData);
        history.push("/profile")

        // if(currentId){
        //     dispatch(updatePost(currentId, postData));
        // }else{
        //     dispatch(createPost(postData));
        // }
    }
    const cancel = () => {
        setForm({...currentOrder})
    }

    return(

        <Box>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h6">{true ? 'Editing' : 'Creating'} an Order</Typography>
            <TextField helperText="Enter message for the delivery" name="message" variant="outlined" 
                       label="Message"  defaultValue={form.message} value={form.message} 
                       onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <TextField helperText="Enter date with format dd-MM-yyyy" placeholder="dd-MM-yyyy"  type="date" name="ordered" 
                       label="Ordered"  value={format(form.ordered)}
                       onChange={(e) =>  setForm({ ...form, ordered: format(e.target.value) })}  />
            <TextField helperText="Enter date with format dd-MM-yyyy" placeholder="dd-MM-yyyy" type="date"  name="sent" 
                       label="Sent" value={format(form.sent)} 
                       onChange={(e) => setForm({ ...form, sent:  format(e.target.value)})}   />
            <TextField helperText="Enter date with format dd-MM-yyyy" placeholder="dd-MM-yyyy"  name="delivered"  
                       label="Delivered" type="date" value={format(form.delivered)} 
                       onChange={(e) => setForm({ ...form, delivered: format(e.target.value)})} />


            <Button  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={cancel} fullWidth>Cancel</Button>
        </form>
    </Box>
    )
}
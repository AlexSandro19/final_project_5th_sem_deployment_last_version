import { TextField, Button,Box, Typography, Paper, InputLabel, Select,MenuItem } from "@mui/material";
import { Grid} from "@mui/material";
import { useState } from "react"
import FileBase from 'react-file-base64';
import { useHistory } from "react-router-dom";

export const CreateItem = ({items,createItem})=>{
    const history= useHistory();
    const [form,setForm] = useState({});
    const updatedItemsList =[...items];
    
    const submitHandler = ()=>{
        form.ratings={ratingsArray:[{userId:"6188f2447bfae277ce60e9f3",rating:4}],medianValueRating:4}
        updatedItemsList.push(form);
        createItem(updatedItemsList,form);
        history.push("/profile");
    }

    const cancel = () => {
        setForm({})

        history.push("/profile");
    }
    return(
        <div>
        <Grid container spacing={2}>
        <form autoComplete="off" noValidate onSubmit={submitHandler}>

        
        <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">Create Item</Typography></Grid>
        <TextField name="name" variant="outlined" 
                           label="Name" fullWidth value={form.name} 
                           onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextField name="description" variant="outlined" 
                           label="Description" fullWidth value={form.description} multiline
                           onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <TextField name="price" variant="outlined" 
                           label="Price" fullWidth value={form.price} 
                           onChange={(e) => setForm({ ...form, price: e.target.value })} />
                <TextField name="quantity" variant="outlined" 
                           label="Quantity" fullWidth value={form.quantity} 
                           onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                <TextField name="categoryArray" variant="outlined" 
                           label="Categories (put ',' between them)" fullWidth value={form.categoryArray} 
                           onChange={(e) => setForm({ ...form, categoryArray: e.target.value.split(',') })} />
                <TextField name="materialArray" variant="outlined" 
                           label="Materials  (put ',' between them)" fullWidth value={form.materialArray} 
                           onChange={(e) => setForm({ ...form, materialArray: e.target.value.split(',') })} />

                <InputLabel id="has-warranty">Warranty</InputLabel>
                <Select
                    labelId="has-warranty"
                    id="has-warranty-option"
                    value={form.hasWarranty}
                    // defaultValue={currentItem.hasWarranty}
                    label="Warranty"
                    onChange={(e) => setForm({ ...form, hasWarranty: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                <InputLabel id="is-popular">Popular</InputLabel>
                <Select
                    labelId="is-popular"
                    id="is-popular-option"
                    value={form.isPopular}
                    // defaultValue={currentItem.hasWarranty}
                    label="Popular"
                    onChange={(e) => setForm({ ...form, isPopular: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>
                <InputLabel id="in-stock">In Stock</InputLabel>
                <Select
                    labelId="in-stock"
                    id="in-stock-option"
                    value={form.stock}
                    // defaultValue={currentItem.hasWarranty}
                    label="In Stock"
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                >
                    <MenuItem value={true}>Yes</MenuItem>
                    <MenuItem value={false}>No</MenuItem>
                </Select>

          
                <FileBase 
                    type="file"
                    multiple={true}
                    onDone={(receivedPics) => {
                            const picturesArray = receivedPics.map(pic => pic.base64); 
                            setForm({ ...form, picturesArray });
                            }}
                />
                           
                <Button  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={cancel} fullWidth>Cancel</Button>
           </form>
           </Grid>
        </div>
    )

}
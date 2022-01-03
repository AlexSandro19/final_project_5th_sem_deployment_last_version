import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import {requestAllItems, setCurrentItem} from "../redux/actions/item";
import { TextField, Button,Box, Typography, Paper, InputLabel, Select,MenuItem } from "@mui/material";
import FileBase from 'react-file-base64';
import {updateItem, createItem} from "../redux/actions/item";

const FormPageComponent = ({ user,currentItem, items, setCurrentItem, updateItem }) => {
const history = useHistory();
const [form, setForm] = useState({...currentItem});
    // const [postData, setPostData] = useState({creator:'', title:'', message:'', tags:'', selectedFile:''});

    // const post = useSelector( (state) => currentId ? state.posts.find((p) => p._id === currentId) : null); 
    // const classes = useStyles();
 
    // useEffect(() => {
    //     if(post) {setPostData(post)};
    // }, [post])

    const handleSubmit = (e) => { // e = event
        updateItem(user,form);
        e.preventDefault();
        history.push("/profile");

        // console.log(currentId, postData);
        

        // if(currentId){
        //     dispatch(updatePost(currentId, postData));
        // }else{
        //     dispatch(createPost(postData));
        // }

        clear();
    }
    const clear = () => {
        // setCurrentId(null);
        // setPostData({creator:'', title:'', message:'', tags:'', selectedFile:''});
    }

    const cancel = () => {
        //setForm({...currentItem});
        history.push("/profile");
    }

    // const updateCurrentItem = (item) => {
    //     // console.log("updated item: ", item);
    //     setCurrentItem(item);
    // }


    return (
        <Box>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{false ? 'Editing' : 'Creating'} an Item</Typography>
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
        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        user:state.user,
        itemsInBasket: state.basket.itemsInBasket, 
        userIsAuthenticated: state.user.isAuthenticated,
    };
};

export default connect(mapStateToProps, {setCurrentItem, updateItem})(FormPageComponent);
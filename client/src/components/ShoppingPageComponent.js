import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Card, CardActionArea, ListItemButton,Tooltip, Checkbox, Radio, CardContent,ListItem, ListItemIcon,ListItemText,Toolbar, List, Drawer, Grid, Box, Typography, ButtonBase, Badge, Divider, Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {requestAllItems, setFilteredItems} from "../redux/actions/item"
import {addItemToBasket} from "../redux/actions/basket";
import {Loader} from "./Loader"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {Link} from "react-router-dom";

import Item from "../components/Item"; 

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
    fab:{
    },

}))

export const ShoppingPageComponent=({items, itemsInBasket, userIsAuthenticated, addItemToBasket})=>{
    const classes=useStyles();
    console.log("In the ShoppingPageComponent itemsInBasket", itemsInBasket);
 
    
    const [checked, setChecked] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [itemsReceived, setItemsReceived] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [emptyFilteredItemsList, setEmptyFilteredItemsList] = useState(false);

    //const [refreshPage, setRefreshPage] = useState("test");

    useEffect( () => {
        setFilteredItems([...items]);
        setItemsReceived(true);
    }, [items])
    //console.log(refreshPage);
    console.log(filteredItems);
    
    
    const drawerWidth = 240;
    
    const filterItems = (filterOption) => () => {
        setFilteredItems([...items]);
        console.log(`Checkbox pressed ${filterOption}`);
        // const currentIndex = checked.indexOf(filterOption);
        const newChecked = [...checked];
        console.log(typeof filterOption);
        if ((typeof filterOption) === 'string'){
            console.log(`filterOption === string`);
            const currentIndex = checked.indexOf(filterOption);
            if (currentIndex === -1) {
                newChecked.push(filterOption);
            } else {
                newChecked.splice(currentIndex, 1);
            }

        }
        if ((typeof filterOption) === 'number'){
           console.log(`filterOption === number`);
            if ((typeof newChecked[0]) === 'number' && newChecked[0] === filterOption){
                console.log("1st option");
                newChecked.shift(); 
            }else if ((typeof newChecked[0]) === 'number' && newChecked[0] !== filterOption){
                console.log("2nd option");
                newChecked.splice(0, 1, filterOption);
            }else if (newChecked.length === 0 || (typeof newChecked[0]) === 'string'){
                console.log("3rd option");
                newChecked.unshift(filterOption); 
            }
            // if (currentIndex === -1) {
            //     newChecked.unshift(filterOption);
            // } else {
            //     newChecked.splice(currentIndex, 1);
            // }

        }


        
        setChecked(newChecked);
        console.log("newChecked", newChecked);
        const filtered = [];
        if (newChecked.length){
            newChecked.forEach(optionChecked => {
            const filteredItemsOnOption = items.filter((item) => {
                let addItem = false;
                if (filtered.includes(item)) {
                    return false;
                }else {
                    if ((typeof optionChecked) === 'string'){
                        item.categoryArray.every(category => {
                            if (category === optionChecked){
                                addItem = true;
                                return false;  
                            }  
                            return true;
                        })
                    } 
                    return addItem;
                }
            })
            filtered.push(...filteredItemsOnOption);
        })
        if ((typeof newChecked[0]) === 'number'){
            let arrayToCheck;
            if (filtered.length === 0){
                arrayToCheck = items;
            }else {
                arrayToCheck = filtered;
            }
            const filteredItemsOnPrice = arrayToCheck.filter((item) => item.price < newChecked[0]);
            console.log("filteredItemsOnPrice ", filteredItemsOnPrice);
            setFilteredItems(filteredItemsOnPrice) 
            if (!filteredItemsOnPrice.length) setEmptyFilteredItemsList(true);
        }else {
            setFilteredItems(filtered) 
            if (!filtered.length) setEmptyFilteredItemsList(true);
        }

        }
        console.log("items length: ", items.length);
        console.log("filtered length: ", filtered.length);
        console.log("filtered : ", filtered);
        
        // if (items.length && (!filtered.length)){
        //     console.log("items.length && !filtered.length: here");
        //     setEmptyFilteredItemsList(true);
        // }










        // const filteredItemsOnCategory = items.filter((item) => {
        //     let addItem = false;
        //     item.categoryArray.every(category => {
        //         // console.log("Print item", item);
        //         if (category === filterOption){
        //             addItem = true; 
        //             return false;  
        //         }  
        //         return true;
        //     })

        //     return addItem;
        // })
        // setFilteredItems([...filteredItemsOnCategory]);
        // console.log("filteredItems array", filteredItems);
        // console.log("filteredItemsOnCategory array", filteredItemsOnCategory);
        // setRefreshPage(`new ${filterOption}`);
    }

    const capitalizeString = (initialStr) => {
        return initialStr
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
    };



    return (

        
        (!filteredItems.length && !itemsReceived) ? <Loader></Loader> : ( //if posts.length is 0 then is false, !false => true
            <>
            
        <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Divider/>
          <List>
          <ListItem>Filter items on Category</ListItem>
          {["bedroom", "kitchen", "living room", "dinning room"].map((filterOption) => {
        const labelId = `checkbox-list-label-${filterOption}`;

        return (
            <ListItem
            key={filterOption}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={filterItems(filterOption)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(filterOption) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={capitalizeString(filterOption)} />
            </ListItemButton>
          </ListItem>
        );
        })}
        <Divider/>
        <ListItem>Filter items on Price</ListItem>
        {[1000, 2000, 5000].map((filterOption) => {
        const labelId = `radio-list-label-${filterOption}`;
        return (
            <ListItem
            key={filterOption}
            disablePadding
          >
            <ListItemButton role={undefined} onClick={filterItems(filterOption)} dense>
              <ListItemIcon>
                <Radio
                  edge="start"
                  checked={checked.indexOf(filterOption) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Price below ${filterOption}`} />
            </ListItemButton>
          </ListItem>
        );
        })}
          </List>
        </Box>
      </Drawer>

            <Grid container spacing={3} alignItems="stretch" >
                {/* <Grid key={"sideBar"} item sm={6} md={4} >
                    <Tabs variant="permanent" open >
                    <Toolbar />
                    <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                        <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        </ListItem>
                        ))}
                        </List>
                        </Drawer>
                    </Grid> */}

                {filteredItems.map((item) => ( 
                    <Grid key={item._id} item xs={12} sm={6} md={4}>
                        <Item item={item} />  
                    </Grid>      
                ))}

                {(emptyFilteredItemsList) 
                    ?   <Snackbar
                            open={() => {setOpenSnackbar(true)}}
                            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                            autoHideDuration={2000}
                            onClose={() => {setOpenSnackbar(false); setEmptyFilteredItemsList(false);}}
                            // message={`${item.name} item was added to Basket!`}
                            // action={action}
                        >
                            <Alert severity="error" sx={{ width: '100%' }}>
                                <b>No items found with these filters. Try choosing other ones.</b>
                            </Alert>
                        </Snackbar>
                    :   (<> </>)

                }
            </Grid>
            {userIsAuthenticated ? 
                <Badge color="secondary" badgeContent={itemsInBasket.length}>
                     <Tooltip title="See added items in Basket" arrow>
                         <Fab color="primary" className={classes.fab} aria-label="Shopping Bag" component={Link} to="/basket">
                             <ShoppingBasketIcon />
                         </Fab>
                         </Tooltip>
                     </Badge>
                : <></>
            }
                     
            </>
    ))
}


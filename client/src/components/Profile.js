import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useState } from "react";
//import { DataGrid } from '@mui/x-data-grid';
import { TextField,ButtonBase,Grid,Divider, Typography,Button, TableHead, TableCell,TableBody,TableRow,Table, TableFooter, TablePagination, Tab } from "@mui/material";
import { NavLink } from "react-router-dom";

const useStyles=makeStyles(()=>({
    back:{
        margin:"1%",
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
    carousel:{
        margin:"1%",
        backgroundColor:"#D7CD79",
        flexGrow:2,
        width: '600px',
        height: '100%',
        paddingBottom:"7%",
    },

}))

export const Profile=({getCurrentOrder,setCurrentItem,handleDeleteOrderOpen,handleDeleteItemOpen,user,form,sendProfileUpdateForm,changeHandler,items})=>{
const classes=useStyles();
console.log("user", user)
console.log(user.orders)
const orderList=[...user.orders];
console.log("user in Profile", user)
console.log("user.orders in Profile", user.orders)
console.log(items)
const [page,setPage]=useState(0);
const [rowsPerPage,setRowsPerPage]=useState(5);
const handlePageChange=(event,newPage)=>{
    setPage(newPage);
}
const handleChangeRowsPerPage=(event)=>{
    setRowsPerPage(parseInt(event.target.value,5));
    setPage(0);
}
const setItem=(item)=>{
    console.log("ADADAEFAEFGF00",item);
    console.log(item)
    setCurrentItem(items,item)
}

const setOrder=(orderId)=>{
    console.log(orderId);
    getCurrentOrder(orderId);
}
const emptyRows=rowsPerPage - Math.min(rowsPerPage,items.length-page*rowsPerPage);
if(user.role === "ADMIN"){
    return(
        <div>
           <Box component="form"
           autoComplete="off"
           width="1400px"
           >
               
               <div>
               <Grid container spacing={4}>
                <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">Items</Typography></Grid>
                <Grid item xs={12}> <Button component={NavLink} to={"/createItem"} style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginLeft:"90%"}}>Add Item</Button></Grid>
                <Grid item xs={12}>
                    <Table>
                        <TableHead>
                        <TableRow></TableRow>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>DESCRIPTION</TableCell>
                            <TableCell>CATEGORY</TableCell>
                            <TableCell>MATERIAL</TableCell>
                            <TableCell>WARRANTY</TableCell>
                            <TableCell>PRICE</TableCell>
                            <TableCell>QUANTITY</TableCell>
                            <TableCell>STOCK</TableCell>
                            <TableCell>POPULAR</TableCell>
                            <TableCell>RATING</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {items.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((item,index)=>{
                            return(
                                <TableRow key={index+1}>
                                    <TableCell>
                                        {index+1}
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.description}
                                    </TableCell>
                                    <TableCell>
                                        {item.categoryArray[0]},{item.categoryArray[1]}
                                    </TableCell>
                                    <TableCell>
                                        {item.materialArray[0]},{item.materialArray[1]}
                                    </TableCell>
                                    
                                {item.hasWarranty ?(<TableCell>YES</TableCell>):(<TableCell>NO</TableCell>)}
                                <TableCell>{item.price} DKK</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                {item.stock ?(<TableCell>YES</TableCell>):(<TableCell>NO</TableCell>)}
                                {item.isPopular ?(<TableCell>YES</TableCell>):(<TableCell>NO</TableCell>)}
                                <TableCell>{item.ratings.medianValueRating}</TableCell>
                                <TableCell>
                                  <Button component={NavLink} to={"/editItem"} onClick={()=>setItem(item)}  style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginRight:"3%"}}>Edit Item</Button>
                                  <Button onClick={()=>handleDeleteItemOpen(item)}  style={{color:"black",backgroundColor:"#FD6464",borderRadius: "6px",marginRight:"3%"}}>Remove Item</Button>
                            </TableCell>
                                </TableRow>
                            )
                        })}
                        {emptyRows>0 &&(<TableRow style={{height:80*emptyRows}}>
                            <TableCell colSpan={6}></TableCell>
                        </TableRow>)}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                page={page}
                                rowsPerPage={rowsPerPage}
                                count={items.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                >
                                    
                                </TablePagination>
                                
                            </TableRow>
                            <TableRow>
                           
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Grid>
                </Grid>
              
               
               <Grid container spacing={4}>
                   <Grid item xs={12}> 
                   <Typography style={{width:"100%",textAlign:"center"}} variant="h2">ORDERS</Typography>
                   <Table>
                       <TableHead>
                           <TableRow>
                               <TableCell>ID </TableCell>
                               <TableCell>Date ordered </TableCell>
                               <TableCell>Date sent </TableCell>
                               <TableCell>Date delivered </TableCell>
                               <TableCell>Total Value </TableCell>
                               <TableCell>Message </TableCell>
                               <TableCell>Items </TableCell>
                           </TableRow>
                       </TableHead>
                       <TableBody>
                       {orderList.map((order,index)=>{
                        return(
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{order.ordered}</TableCell>
                                <TableCell>{order.sent}</TableCell>
                                <TableCell>{order.delivered}</TableCell>
                                <TableCell>{order.totalValue}</TableCell>
                              { order.message === "" ?(<TableCell>No message provided</TableCell>):(<TableCell>{order.message}</TableCell>)}
                              <TableCell>
                                  <Button onClick={()=>setOrder(order._id)} component={NavLink} to={"/viewOrder"} style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginRight:"2%"}}>View Items</Button>
                                  <Button onClick={()=>setOrder(order._id)} component={NavLink} to={"/editOrder"} style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px",marginRight:"2%"}}>Edit Order</Button>
                                  <Button onClick={()=>handleDeleteOrderOpen(order._id)} style={{color:"black",backgroundColor:"#FD6464",borderRadius: "6px",marginRight:"2%"}}>Delete Order</Button>
                            </TableCell>
                            </TableRow>
                        )
    
                         })}
                       </TableBody>
                   </Table>
                </Grid>
                
                <Divider style={{margin:"5%"}} />
               
       
               <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">UPDATE</Typography></Grid>
               <Grid item xs={12}><TextField type="email" value={form.email} onChange={changeHandler} style={{width:"100%"}} required label="Email" id="email" name="email" ></TextField></Grid>
               <Grid item xs={6}><TextField type="text" value={form.username} onChange={changeHandler} style={{width:"100%"}}  required label="Username" id="username" name="username"></TextField></Grid>
               <Grid item xs={6}><TextField type="text" value={form.name} onChange={changeHandler} style={{width:"100%"}}  label="Name" id="name" name="name"></TextField></Grid>
               <Grid item xs={12}><TextField type="password" value={form.password} onChange={changeHandler} style={{width:"100%"}}  required label="Password" id="password" name="password" ></TextField></Grid>
               <Grid item xs={12}><TextField type="password" onChange={changeHandler} style={{width:"100%"}}  required label="Confirm password" required id="passwordConfirm" name="passwordConfirm" ></TextField></Grid>
               <Grid item xs={12}><TextField type="tel" value={form.phone} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone"></TextField></Grid>
               <Grid item xs={12}><TextField type="tel" value={form.phone} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone"></TextField></Grid>
               
               <Grid item xs={12}><TextField type="text" onChange={changeHandler} multiline value={form.address} style={{width:"100%"}}  label="Address" id="address" name="address"></TextField></Grid>
               <Grid item xs={12}>
               <Button 
               variant="contained"
               color="primary" 
               type="submit"
               >
                   Update
               </Button>
               </Grid>
       
               </Grid>
               <Divider/>
               </div>
               
           </Box>
           </div>
    
       
    )
    
    
}
return(
    <div> 
       <Box component="form"
       autoComplete="off"
       width="1000px"
       onSubmit={sendProfileUpdateForm}
       >
           
           <div>
           
           
           <Grid container spacing={4}>
               <Grid item xs={12}>
               <Typography style={{width:"100%",textAlign:"center"}} variant="h2">ORDERS</Typography>
               <Table>
                   <TableHead>
                 
                       <TableRow>
                           <TableCell>ID </TableCell>
                           <TableCell>Date ordered </TableCell>
                           <TableCell>Date sent </TableCell>
                           <TableCell>Date delivered </TableCell>
                           <TableCell>Total Value </TableCell>
                           <TableCell>Message </TableCell>
                           <TableCell>Items </TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                   {orderList.map((order,index)=>{
                    return(
                        <TableRow>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{order.ordered}</TableCell>
                            <TableCell>{order.sent}</TableCell>
                            <TableCell>{order.delivered}</TableCell>
                            <TableCell>{order.totalValue}</TableCell>
                          { order.message === "" ?(<TableCell>No message provided</TableCell>):(<TableCell>{order.message}</TableCell>)}
                          <TableCell>
                              <Button onClick={()=>setOrder(order._id)} component={NavLink} to={"/viewOrder"}  style={{color:"black",backgroundColor:"#FDFFEE",borderRadius: "6px"}}>View Items</Button>
                        </TableCell>
                        </TableRow>
                    )

                     })}
                   </TableBody>
               </Table>
            </Grid>
            
            <Divider style={{margin:"5%"}} />
           
   
           <Grid item xs={12}><Typography style={{width:"100%",textAlign:"center"}} variant="h2">UPDATE</Typography></Grid>
           <Grid item xs={12}><TextField type="email" value={form.email} onChange={changeHandler} style={{width:"100%"}} required label="Email" id="email" name="email" ></TextField></Grid>
           <Grid item xs={12}><TextField type="text" value={form.username} onChange={changeHandler} style={{width:"100%"}}  required label="Username" id="username" name="username"></TextField></Grid>
           <Grid item xs={6}><TextField type="text" value={form.firstName} onChange={changeHandler} style={{width:"100%"}}  label="First Name" id="firstName" name="firstName"></TextField></Grid>
           <Grid item xs={6}><TextField type="text" value={form.lastName} onChange={changeHandler} style={{width:"100%"}}  label="Last Name" id="lastName" name="lastName"></TextField></Grid>
           <Grid item xs={12}><TextField type="password" value={form.password} onChange={changeHandler} style={{width:"100%"}}  required label="Password" id="password" name="password" ></TextField></Grid>
           <Grid item xs={12}><TextField type="password" onChange={changeHandler} style={{width:"100%"}}  required label="Confirm password" required id="passwordConfirm" name="passwordConfirm" ></TextField></Grid>
           <Grid item xs={12}><TextField type="tel" value={form.phone} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone"></TextField></Grid>
           <Grid item xs={12}><TextField type="tel" value={form.phone} onChange={changeHandler} style={{width:"100%"}} required label="Phone number" id="phone" name="phone"></TextField></Grid>
           
           <Grid item xs={12}><TextField type="text" onChange={changeHandler} multiline value={form.address} style={{width:"100%"}}  label="Address" id="address" name="address"></TextField></Grid>
           <Grid item xs={12}>
           <Button 
           variant="contained"
           color="primary" 
           type="submit"
           >
               Update
           </Button>
           </Grid>
   
           </Grid>
           <Divider/>
           </div>
           
       </Box>
       </div>

   
)


}
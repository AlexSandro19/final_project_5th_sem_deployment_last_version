
import { Card, Grid, Typography,Button, TableHead, TableCell,TableBody,TableRow,Table, TableFooter, TablePagination, } from "@mui/material"
import { useState } from "react";
export const ViewOrder=({currentOrder})=>{
    const [page,setPage]=useState(0);
    const [rowsPerPage,setRowsPerPage]=useState(5);
    const emptyRows=rowsPerPage - Math.min(rowsPerPage,currentOrder.items.length-page*rowsPerPage);
    
    const handlePageChange=(event,newPage)=>{
        setPage(newPage);
    }
    const handleChangeRowsPerPage=(event)=>{
        setRowsPerPage(parseInt(event.target.value,5));
        setPage(0);
    }
    return(

        <div >
        <Card style={{background:"#D7CD79"}}>
            <Grid container>
                
            <Grid item xs={6}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
            <Typography variant="h5">Order Id: 1 </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5" >Order date : {currentOrder.ordered} </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5">Sent date : {currentOrder.sent} </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5">Delivery date : {currentOrder.delivered} </Typography>
            </Grid>
            <Grid item xs={12}><Typography style={{width:"100%",textAlign:"right"}} variant="h2">ITEMS</Typography></Grid>
            <Grid item xs={12}>
            <Table style={{marginLeft:"15%"}}>
                        <TableHead>
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
                        {currentOrder.items.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage).map((item,index)=>{
                            return(
                                <TableRow key={index}>
                                    <TableCell>
                                        {index}
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
                                count={currentOrder.items.length}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ></TablePagination>
                            </TableRow>
                        </TableFooter>
                    </Table>

            </Grid>
            </Grid>
            </Grid>
            <Grid item xs={6}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
          {currentOrder.message === "" ?(<Typography variant="h5">   Message: No message was given for the order.</Typography>):(<Typography variant="h5">   Message:  {currentOrder.message}</Typography>)}
            </Grid>
            </Grid>
            </Grid>
            </Grid>
        </Card>
        </div>
    )
}
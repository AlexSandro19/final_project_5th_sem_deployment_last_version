import { Card, CardActionArea, CardContent, Grid, Box, Typography, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {useEffect,useCallback} from "react"
import { connect } from "react-redux";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Carousel from 'react-material-ui-carousel'
import {requestAllItems} from "../redux/actions/item";
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
const HomePage=({items,requestAllItems})=>{
const classes=useStyles();
var popular=[];
var highestRated=[];
const fetchItems = useCallback(() => {
    requestAllItems()
  
}, [])
useEffect(()=>{
    fetchItems();
  
   
},[fetchItems])
  
    popular=items.filter((a)=>{
       return a.isPopular;
            
    })
     highestRated =items.sort((a,b)=>{
        const first=a.ratings.medianValueRating;
        const second = b.ratings.medianValueRating;
        return second - first ;
    })
//console.log(highestRated);
var displayText=[
    {
        title:"Title 1",
        description:"Small description "
    },
    {
        title:"Title 2",
        description:"Small description "
    },
    {
        title:"Title 3",
        description:" Small description "
    },  
    {
        title:"Title 4",
        description:"Small description "
    }
]
return(
    <div>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={12} >
            <Carousel>
                {
                   displayText.map((item)=>{
                       return(
                        <Paper  style={{backgroundColor:"#D7CD79"}}  className={classes.carousel}>
                        
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body1">{item.description}</Typography>
                        </Paper>
                       )
                   })
                }

            </Carousel>
        </Grid>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={12} >

        </Grid>

        <Grid item xs={12}>
        <Grid container  direction="row" justifyContent="center"  alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={12}>
        <Box style={{height:"600px"}}   className={classes.back}>
        <Typography variant="h4" textAlign="center">Most Popular Items Right Now</Typography>
        <Grid container spacing={1}>
        {popular.map((item)=>{
            return(
                <Grid item xs={6}>
                <Card style={{}} className={classes.card}>
                    <CardContent>
                        <Typography variant="h4">{item.name}</Typography>
                        <Typography variant="body1">{item.description}</Typography>
                        <Typography variant="body2">Price: {item.price} DKK</Typography>

                    </CardContent>
                <CardActionArea style={{width:"50%",marginLeft:"25%",backgroundColor:"#FDFFEE"}} >
                <Typography style={{textAlign:"center"}} variant="h6">CART</Typography>
                </CardActionArea>
                </Card>
                </Grid>
            )
        })}
        </Grid>
        </Box>
        </Grid>
       
        <Grid item xs={12} sm={12} md={6} xl={6} lg={12}>
        <Box style={{height:"300px"}}   className={classes.back}>
        <Typography variant="h4" textAlign="center">Highest Rated Designs</Typography>
        <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={6} xl={6} lg={12}>
        <Card style={{backgroundColor:"#C4C4C4"}} className={classes.card}>
            <CardContent>
                <Typography variant="h5">Dinning Chair</Typography>
                <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo egestas nunc faucibus risus sit quisque...</Typography>
            </CardContent>
        <CardActionArea style={{width:"50%",marginLeft:"25%",backgroundColor:"#FDFFEE"}} >
        <Typography style={{textAlign:"center"}} variant="h6">CART</Typography>
        </CardActionArea>
        </Card>
        </Grid></Grid></Box>
        <Grid item xs={6}> <Box style={{height:"300px"}} className={classes.back}>     
        <Typography variant="h4" textAlign="center">Highest Rated Items</Typography>
        <Grid container spacing={1}>
        {highestRated.slice(0,2).map((item)=>{
            return(
                <Grid item xs={6}>
                <Card style={{backgroundColor:"#C4C4C4"}} className={classes.card}>
                    <CardContent>
                        <Typography variant="h4">{item.name}</Typography>
                        <Typography variant="body1">{item.description}</Typography>
                        <Typography variant="body2">Price: {item.price} DKK</Typography>

                    </CardContent>
                <CardActionArea style={{width:"50%",marginLeft:"25%",backgroundColor:"#FDFFEE"}} >
                <Typography style={{textAlign:"center"}} variant="h6">CART</Typography>
                </CardActionArea>
                </Card>
                </Grid>
            )
        })}
        </Grid>
        
        </Box></Grid>
        
        </Grid>
        </Grid>
        </Grid>
        </Grid>
    </div>
)
}
const mapStateToProps = (state) => {
    return {
        items:state.items.items
    };
  };
  
export default connect(mapStateToProps,{requestAllItems})(HomePage)
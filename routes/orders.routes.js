const { Router } = require("express");

const { check, validationResult } = require("express-validator");
const Furniture = require("../model/Furniture");
const User = require("../model/User")
const Order= require("../model/Order");
require("dotenv").config();



const router = Router();



// GET /api/items
router.get("/items",
    async (req, res) => {
      try {
        console.log("api/items is called");
        const allItems = await Furniture.find({});
        console.log(allItems);
        // console.log(allItems[0]); -- to access a specifc element in the array
        if (allItems.length === 0) {
          return res.status(404).json({ message: "No data available" });
        }
    
        return res.status(200).json(allItems);
        
      } catch(error) {
          return res.status(404).json({ message: error });
      }

    }
 );

router.post("/saveCart",
    async (req, res) => {
      try {
        console.log("api/saveCart is called");
        // const {user, cart} = req.body
        const {user, cart} = req.body;
        await User.findByIdAndUpdate(user.id, {...user, cart},  { new: true });
        return res.status(200).json({didUserUpdate: true});
        // if (Object.keys(savedItem).length !== 0){
        //   console.log("item updated successfully");
        //   return res.status(200).json(savedItem);
        // }else {
        //   console.log("item didnt update");
        // }
        // if (items.length === 0) {
        //   return res.status(404).json({ message: "No data available" });
        // }
        // console.log(items);
        // return res.status(200).json(items);
        
      } catch(error) {
        console.log(error.message);
          return res.status(404).json({ didUserUpdate: false, message: error });

      }

    }
); 
 
router.post("/updateOrder",async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data while sending",
      });
     
   }
   const {order} = req.body
   const updatedOrder = await Order.findByIdAndUpdate(order._id,order,{new:true});
   //console.log(updatedOrder);
   return res.status(200).json(updatedOrder);
  }catch(error){
    console.log(error.message);
    return res.status(500).json({error:error,message:error.message})

  }
})

router.post("/order",async(req,res)=>{

    try{
      const errors=  validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Invalid data while sending",
        });
     }

     const {orderId}=req.body;
     //console.log(orderId);
     const order = await Order.findOne({_id:orderId}).populate("items");
     //console.log(order);
     if(!order){
         return res.status(400).json({message:"Order not found"})
     }
     return res.status(200).json(order);
    }catch(error){

        console.log(error.message);
        return res.status(500).json({error:error,message:error.message})
    }

})


router.post("/saveCart",
    async (req, res) => {
      try {
        console.log("api/saveCart is called");
        // const {user, cart} = req.body
        const {user, cart} = req.body;
        console.log("/saveCart req.body ", req.body)
        const userToUpdate = await User.findOne({_id: user.id}).select(" password email orders cart  username phone address firstName lastName role").populate({path:"orders",populate:{path:"items"}}).populate("cart").exec();
        console.log("user.populated('cart')", userToUpdate.populated("cart"));
        user.cart = [...cart]
        userToUpdate.cart = [...cart]
        await userToUpdate.save();
        console.log("userToUpdate, ", userToUpdate)
        return res.status(200).json({userUpdated:user, didUserUpdate:true});
        // if (Object.keys(savedItem).length !== 0){
        //   console.log("item updated successfully");
        //   return res.status(200).json(savedItem);
        // }else {
        //   console.log("item didnt update");
        // }
        // if (items.length === 0) {
        //   return res.status(404).json({ message: "No data available" });
        // }
        // console.log(items);
        // return res.status(200).json(items);
        
      } catch(error) {
        console.log(error);
          return res.status(404).json({ didUserUpdate: false, message: error });

      }

    }
); 

router.post("/createOrder",async(req,res)=>{

  try{

    const data = req.body;
    console.log("/createOrder req.body, ", req.body)
    const order = new Order({...data})
    await order.save();
    console.log("CreatedOrder, ", order)
    const userUpdated = await User.findOne({_id:order.userId}).populate("items");
    userUpdated.orders.push(order)
    userUpdated.cart = []
    await userUpdated.save()
    console.log("userUpdated ", userUpdated)
    // const updatedOrders = [...user.orders, order._id];
    // console.log("updatedOrders ", updatedOrders)
    // console.log("updatedOrders ofter push ", updatedOrders)
    // await user.updateOne({_id: user._id}, {orders: updatedOrders})

    return res.status(201).json({orderCreated : true});
  }catch(error){

      console.log(error.message);
      return res.status(500).json({error:error,message:error.message,orderCreated : false})
  }

})
 

module.exports = router;
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const Furniture = require("../model/Furniture");
const User = require("../model/User")
require("dotenv").config();

//const allItems = require("../data_for_tests/furniture.json"); 

const router = Router();

const storedItems = [
  {
    picturesArray: [],
    categoryArray: [ 'living room', 'bedroom' ],
    materialArray: [ 'oakwood', 'plywood' ],
    _id: "6188f2447bfae277ce60e9f3",
    name: 'Closet',
    hasWarranty: true,
    isPopular: true,
    price: 3100,
    quantity: 30,
    stock: true,
    description: 'Small simple closet for living room',
    ratings: { ratingsArray: [Array], medianValueRating: 3.6 },
    updatedAt: "2021-12-19T19:01:50.753Z"
  },
  {
    picturesArray: [],
    categoryArray: [ 'kitchen' ],
    materialArray: [ 'oakwood', 'plywood' ],
    _id: "619637eeba71df9cdb00163d",
    name: 'Kitchen',
    hasWarranty: true,
    isPopular: true,
    price: 7000,
    quantity: 3,
    stock: true,
    description: 'Full kitchen (sink, washing machine etc)',
    ratings: { ratingsArray: [Array], medianValueRating: 3.5 },
    updatedAt: "2021-12-19T13:19:32.240Z"
  },
  {
    picturesArray: [],
    categoryArray: [ 'dinning room', 'bedroom' ],
    materialArray: [ 'oakwood', 'plywood' ],
    _id: "619637f2ba71df9cdb00163e",
    name: 'Bed',
    hasWarranty: true,
    isPopular: false,
    price: 1500,
    quantity: 13,
    stock: true,
    description: 'Single bed with matras',
    ratings: { ratingsArray: [Array], medianValueRating: 3.5 }
  },
  {
    picturesArray: [],
    categoryArray: [ 'dinning room', 'bedroom' ],
    materialArray: [ 'oakwood', 'plywood' ],
    _id: "619637f8ba71df9cdb00163f",
    name: 'Scarpiera',
    hasWarranty: true,
    isPopular: false,
    price: 700,
    quantity: 300,
    stock: true,
    description: 'Small simple closet for to keep your shoes in',
    ratings: { ratingsArray: [Array], medianValueRating: 4 }
  }
]


// GET /api/items
router.get("/items",
    async (req, res) => {
      try {
        console.log("api/items is called");
        const allItems = await Furniture.find({});
        //console.log(allItems);
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
 router.post("/deleteItem",async(req,res)=>{
   try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data while sending",
      });
    }
    const deleteItem = req.body;
    //console.log(deleteItem);
    await Furniture.findByIdAndDelete(deleteItem._id);
    const allItems = await Furniture.find({});
    return res.status(200).json(allItems)
   }catch(error){
    console.log(error.message);
    return res.status(404).json({ message: error });
   }
 })
router.post("/createItem",async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Invalid data while sending",
      });
    }
    const item = req.body;
    console.log("SDASD00");
    console.log(item);
    await Furniture.create(item);
    return res.status(200).json({message:"Successfully created a new Item"});
  }catch(error){
    console.log(error.message);
    return res.status(404).json({ message: error });
  }
})
router.post("/updateItem",
    async (req, res) => {
      try {
        console.log("api/updateItem is called");

        const updatedItem = req.body;
        console.log("updated item: ", updatedItem);
        const savedItem = await  Furniture.findByIdAndUpdate(updatedItem._id, updatedItem,  { new: true }); 
        console.log("saved item: ", savedItem);
        return res.status(200).json(savedItem);
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
          return res.status(404).json({ message: error });

      }

    }
); 
 


module.exports = router;
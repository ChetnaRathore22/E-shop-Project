import express from "express";
import { verify } from "../middelware/authenticate.js";

import {addToCart,viewCart,removeCart,CartLoad} from "../controller/cart.controller.js";
const router=express.Router();
// router.get("/add-to-cart",verify,addToCart)
router.get("/add-to-cart/:userId/:productId",verify,addToCart);
router.get("/deleteCart/:id",verify,removeCart)
router.get("/viewcart",verify,viewCart);
router.get("/load-cart",verify,CartLoad);



export default router;
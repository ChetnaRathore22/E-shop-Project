import express from "express";
import { orderSave,myOrder,orderHistory} from "../controller/order.controller.js";
import { verify} from "../middelware/authenticate.js";


const router=express.Router();
router.post("/save",verify,orderSave)
router.get("/myorder/:id",verify,myOrder)
router.get("/History",verify,orderHistory);


export default router;
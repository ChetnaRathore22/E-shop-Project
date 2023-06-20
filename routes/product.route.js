import express from "express";

import{showCategoryByProduct,searchProduct}from"../controller/product.controller.js";
const router=express.Router();
router.get("/:categoryName",showCategoryByProduct);
router.get("/search/:key" ,searchProduct);

export default router;
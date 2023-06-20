import {products} from '../controller/product.controller.js'
import express from 'express';
const router=express.Router();
router.get('/all',products);

export default router;
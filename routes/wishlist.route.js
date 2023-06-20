import express from "express";

import { wishlistProduct,viewWishList,removeLike} from "../controller/wishlist.controller.js";
import { verify } from "../middelware/authenticate.js";
const router=express.Router();
router.get("/:pid/:status",verify,wishlistProduct)
router.get("/view",viewWishList)
router.get("/delete/:id/:status", verify, removeLike);
export default router;
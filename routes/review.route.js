import express from "express";
import { GetDataReview} from "../controller/review.controller.js";

const router=express.Router();
router.post("/Save",GetDataReview)

export default router;
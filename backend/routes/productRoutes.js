import express from "express";
import { createProduct, getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// routes
router.get("/", getAllProducts);
router.post("/", createProduct);



export default router;
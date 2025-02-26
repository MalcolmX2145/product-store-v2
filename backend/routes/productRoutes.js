import express from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();

// routes
router.get("/", getProducts); // get all products
router.get("/:id", getProduct); // get a single product
router.post("/", createProduct); // create a new product
router.put("/:id", updateProduct); // update a product
router.delete("/:id", deleteProduct); // delete a product



export default router;
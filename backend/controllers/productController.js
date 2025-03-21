// Logic for the CRUD operations for the db

import {sql} from '../config/db.js';

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;

        console.log("fetched products", products);
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error in getProducts function", error);
        res.status(500).json({success: false, message: "Error fetching products"});
    }
};

export const createProduct = async (req, res) => {
    const {name, price, image} = req.body; // gotten from the app.use(express.json());

    // check if user provided all fields
    if (!name || !price || !image) {
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }

    try {
        const newProduct = await sql`
        INSERT INTO products (name, price, image)
        VALUES (${name}, ${price}, ${image})
        RETURNING *
        `;

        console.log("created product", newProduct);
        res.status(201).json({success: true, data: newProduct[0]});
    } catch (error) {
        console.log("error in createProduct function", error);
        res.status(500).json({success: false, message: "Error creating products"});
    }
};
export const getProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const product = await sql`
        SELECT * FROM products WHERE id = ${id}
        `;

        return res.status(200).json({success: true, data: product[0]});
    } catch (error) {
        console.log("error in getProduct function", error);
    }
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        // Validate input
        if (!name || !price || !image) {
            return res.status(400).json({ 
                success: false, 
                message: "All fields are required" 
            });
        }

        const updatedProduct = await sql`
            UPDATE products 
            SET name = ${name}, price = ${price}, image = ${image} 
            WHERE id = ${id} 
            RETURNING *
        `;

        if (updatedProduct.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "Product not found" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            data: updatedProduct[0] 
        });
    } catch (error) {
        console.log("Error in updateProduct function", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to update product" 
        });
    }
};
export const deleteProduct = async (req, res) => {
    const {id} = req.params;

    try {
        const deletedProduct = await sql`
        DELETE FROM products
        WHERE id = ${id}
        RETURNING *
        `;

        if (deletedProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        console.log("deleted product", deletedProduct);
        return res.status(200).json({success: true, data: deletedProduct[0]});
    } catch (error) {
        console.log("error in deleteProduct function", error);
        return res.status(500).json({success: false, message: "Error deleting product"});
    }
};
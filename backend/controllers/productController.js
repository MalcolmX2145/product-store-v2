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
    const {name, price, image} = req.body;

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
        
    } catch (error) {
        console.log("error in getProduct function", error);
    }
};
export const updateProduct = async (req, res) => {};
export const deleteProduct = async (req, res) => {};
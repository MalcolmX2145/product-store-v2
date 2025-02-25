import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // express.json() is a middleware that parses incoming requests with JSON payloads
app.use(helmet()); // helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // morgan is a middleware that logs HTTP requests
app.use(cors()); // cors is a middleware that enables cross-origin resource sharing

app.use("/api/products", productRoutes);

app.get("/test", (req, res) => {
    res.send("Backend is ready for testing.");
});

;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
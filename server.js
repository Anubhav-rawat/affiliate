import "dotenv/config";
import express from "express";
import connectDB from "./config/dbConfig.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

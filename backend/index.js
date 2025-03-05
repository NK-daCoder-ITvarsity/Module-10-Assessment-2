import dotenv from "dotenv";
dotenv.config(); // Ensure it's the first thing loaded

import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

// Debugging - Check if .env is loading properly if its says undefined move .env to root directory
// console.log("PORT:", process.env.PORT);
// console.log("DB_URL:", process.env.DB_URL);

const main = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ MongoDB Connected");

        // Routes
        app.get("/", (req, res) => res.send("Database Is Connected And Server is Activated..."));

        // Ports
        app.listen(port, () => {
            console.log(`🚀 Server Operational at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1); // Exit if DB connection fails
    }
};

main();

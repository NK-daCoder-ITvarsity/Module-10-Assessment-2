import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
    res.send(`This is the server of http://localhost:${port}`)
})

// npm run start:server

app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
})
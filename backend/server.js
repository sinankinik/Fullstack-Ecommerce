const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const mainRoute = require("./routes/index.js");
const port = 5000;

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect ok")
    } catch (error) {
        throw error;
    }
}

//middlewares
app.use(express.json());
app.use(logger("dev"));
app.use(cors());


app.use("/api", mainRoute);

app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor`)
})

import express from "express";
import dotenv from "dotenv/config"
import { router as Routes } from "./routes/index.js";
import { dirname } from "path"
import { fileURLToPath } from "url";
import { connect } from "./db/connect/connect.js";
const PORT =  process.env.PORT
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(express.static(__dirname + "/views/assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Routes);
connect();

app.listen(PORT,()=>{
    console.log("SERVER RUNNING ON PORT : ",PORT);
})




import express from "express";
import { connection } from "./src/db/connect.js"; //clear screen
import { auth } from "./src/route/auth.js";
import cors from "cors";
import process from "process";
import { crops } from "./src/route/crops.js";
import {join,dirname} from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use("/auth", auth);
app.use("/crops", crops);
app.get("/public/:name",async (req, res,next) => {
  const options = {
    root: join(__dirname,"public"),
  };
  try {
    setTimeout(()=>{
      res.sendFile(req.params.name, options, (err) => {
      if (err) {
        console.log(err);
      }
    });
    },25)
    
  } catch (error) { 
    console.log(error);
  }
});
app.get("/", (req, res) => {
  res.send("wlcome to youth fast");
});
const server = async () => {
  try {
    process.stdout.write(`\x1b[2J`); //clear screen
    process.stdout.write(`\x1b[0f`); //set cursor to 0,0
    console.warn("\x1b[30m ▶️ Starting App :");
    await connection();
    app.listen(4000, () => {
      console.log(`\x1b[32m  🚀 http://localhost:4000/\x1b[0m`);
    });
  } catch (error) {
    console.log("server: " + error);
  }
};

server();
export default app
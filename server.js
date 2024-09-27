import express from "express";
import dotenv from "dotenv";
import router from "./routers/index.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path'
import {setupDb} from './utils/mongodb.js'


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
setupDb()
app.use(cors());
app.use(express.static(__dirname + "/client"))
app.use(express.json());
app.use("/api", router);

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

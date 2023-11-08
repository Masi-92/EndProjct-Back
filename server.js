import express from "express";
import dotenv from "dotenv";
import router from './routers/index.js'
import cors from "cors";

dotenv.config();
import "./utils/mongodb.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router)


const PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});

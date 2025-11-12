import express from "express";
import taskRouters from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotevn from "dotenv";
import cors from 'cors';
dotevn.config();

const PORT = process.env.PORT || 5001;

const app = express();
// middleware
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}));


app.use(express.json());

app.use("/api/tasks", taskRouters);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server.js đã bắt đầu trên cổng: ", PORT);
  });
});

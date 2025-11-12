import express from "express";
import taskRouters from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotevn from "dotenv";
import cors from "cors";
import path from "path";

dotevn.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
// middleware
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json());

app.use("/api/tasks", taskRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server.js đã bắt đầu trên cổng: ", PORT);
  });
});

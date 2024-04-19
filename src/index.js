import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import user_router from "./routes/user_router.js";
import login_router from "./routes/login_router.js";
import uploadImage from "./routes/uploadImage.js";
import helmet from "helmet";

dotenv.config();

const app = express();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on("error", function (error) {
  console.error(error);
});
db.once("open", function (open) {
  console.log("Connected to database");
});

app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/users", user_router);
app.use("/api/login", login_router);
app.use("/api/uploadImage", uploadImage);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, function () {
  console.log("Server Connected");
  console.log(`port 3000`);
});

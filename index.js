import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import compression from "compression";
import passport from "passport";
import "./passport.js";
import "./Database/modules.js";
import router from "./Routers/auth.js";
import postrouter from "./Routers/uploadpost.js";
import blogsRouter from "./Routers/getBlogs.js";
import likesRouter from "./Routers/likesRoute.js";
import { ConnectoDb } from "./Database/connet.js";
import helmet from "helmet";
import path from "path";
// import cookieParser from "cookie-parser";
// import session from "express-session";

const app = express();
app.use(express.static("views"));
app.get("/", () => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use(
  cors({
    // origin:"https://bblog-blogging.onrender.com",
    credentials: true,
    methods: ["GET", "POST"],
  })
);

dotenv.config();

const DATABASE_URL =
  "mongodb+srv://Sachin:Sachimaa.123@cluster0.2jeodxz.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 6000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    httpOnly: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

import "./Routers/auth.js";

ConnectoDb(DATABASE_URL);

app.use(compression());

app.use(helmet());

app.get("/", (req, res) => {
  res.status(403);
});
app.use("/", router);
app.use('/',postrouter);
app.use('/',blogsRouter);
app.use('/',likesRouter);

app.listen(PORT, () => {
  console.log("app is listening to port no 6000");
});

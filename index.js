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
import "./Routers/auth.js";
const app = express();

const DATABASE_URL ="mongodb+srv://Sachin:Sachimaa.123@cluster0.2jeodxz.mongodb.net/?retryWrites=true&w=majority";


dotenv.config();

ConnectoDb(DATABASE_URL);

const corsConfig={
  origin:true,
  credentials:true,
}

// app.use(
//   cors({
//     origin:"https://revcode.onrender.com",
//     credentials: true,
//     methods: ["GET", "POST"],
//     optionsSuccessStatus:200
//   })
// );

app.use(cors(corsConfig));
app.options('*',cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge:30*24*60*60*1000,
    name: "session",
    keys: ["key1", "key2"],
    // httpOnly: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());







app.get("/", (req, res) => {
  res.send("listening");
});
app.use("/", router);
app.use('/',postrouter);
app.use('/',blogsRouter);
app.use('/',likesRouter);

app.listen(5021, () => {
  console.log("app is listening to port no 5021");
});

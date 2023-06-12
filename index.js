import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import compression from 'compression';
import passport from "passport";
import './Routers/auth.js';
import "./passport.js";
import "./Database/modules.js";
import router from "./Routers/auth.js";
import postrouter from './Routers/uploadpost.js'
import blogsRouter from "./Routers/getBlogs.js";
import likesRouter from "./Routers/likesRoute.js";
import { ConnectoDb } from "./Database/connet.js";
import helmet from "helmet";


dotenv.config();
const DATABASE_URL=process.env.DATABASE_URL
const PORT=process.env.PORT || 6000
const app = express();

app.set("trust proxy", 1);

app.use(cookieSession({
  path: '/',
  sameSite:'none',
  secure: false,
  maxAge: 24*60*60*1000,
  name:'session',
  keys:["key1","key2"],
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://bblog-blogging.onrender.com",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

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

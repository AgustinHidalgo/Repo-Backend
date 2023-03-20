import express from "express";
import { _dirname } from "./utils.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import handlebars from "express-handlebars";
import loginRouter from "./routes/login.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies
const cookieKey = "practicandoCookies";
app.use(cookieParser(cookieKey));
//sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//routes
app.use("/login", loginRouter);
app.use("/views", viewsRouter);
app.use('/session', sessionRouter)

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", _dirname + "/views");

app.listen("3000", () => {
  console.log("Escuchando al puerto 3000");
});
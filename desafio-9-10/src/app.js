import express from "express";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import userRouter from "./routes/users.router.js";
import ProductsManager from "./dao/mongoManagers/productsManager.js";
import "./dao/dbConfig.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
//passport
import passport from "passport";
import './passport/passportStrategies.js'
import jwtRouter from "./routes/jwt.router.js";

const app = express();

//inicializando
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'))
//cookie
app.use(cookieParser());


//session
app.use(
  session({
    store: new MongoStore({
      mongoUrl:
        "mongodb+srv://bachicha:bachicha@cluster0.ummjcbo.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }),
    secret: "LorenzoNM",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:20000}
  })
);
//passport 
app.use(passport.initialize())
app.use(passport.session())
//routes
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/users", userRouter);
app.use("/jwt", jwtRouter)
app.use("/", viewsRouter);


//motor de plantilla
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "handlebars",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Port
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log("escuchando el puerto 8080");
});
export const socketServer = new Server(httpServer);

const productsManager = new ProductsManager();
const products = productsManager.getProducts();

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado con el id ${socket.id}`);
  socket.emit("products", products);
});
import express from "express";
import { __dirname } from "./utils.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";
import ViewsRouter from "./routes/views.router.js";
import UsersRouter from "./routes/users.router.js";
import MailRouter from "./routes/mail.router.js";
import "./persistence/mongoDB/dbConfig.js";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./service/passport/passportStrategies.js";
import config from "./config.js";
import { generateProducts } from "./Utils/faker.js";
import logger from "./Utils/winston.js";
import { swaggerSetup } from "./Swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();

//inicializando
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/presentation/public"));
app.use(cookieParser());
//passport
app.use(passport.initialize());
//routes
app.use("/products", ProductsRouter.getRouter());
app.use("/carts", CartRouter.getRouter());
app.use("/users", UsersRouter.getRouter());
app.use("/forgot-password", MailRouter.getRouter());
app.use("/", ViewsRouter.getRouter());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.use("/mockingproducts", (req, res) => {
  const products = [];
  for (let i = 0; i <= 100; i++) {
    const product = generateProducts();
    products.push(product);
  }
  res.json({ products });
});

app.use("/loggertest", (req, res) => {
  logger.info("logger info");
  logger.fatal("logger fatal");
  logger.error("logger error");
  logger.warning("logger warning");
  logger.http("logger http");
  logger.debug("logger debug");
  res.send("loggers");
});

//motor de plantilla
app.engine(
  "handlebars",
  handlebars.engine({
    extname: "handlebars",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("views", __dirname + "/presentation/views");
app.set("view engine", "handlebars");

//Port
const PORT = config.PORT;

const httpServer = app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`);
});
export const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log(`Usuario conectado con el id ${socket.id}`);
  socket.emit("products", products);
});
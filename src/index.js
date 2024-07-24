import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import routes from "./routes/index.routes.js";
import viewsRoutes from "./routes/views.routes.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { connectToDB } from "./config/db.config.js";
import session from "express-session";
import envsConfig from "./config/envs.config.js";
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

const app = express();

connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser(envsConfig.SECRET_CODE));
app.use(
  session({
    secret: envsConfig.SECRET_CODE,
    resave: true, //mantiene la sesion activa. Si fuera false, se cerraria luego de un tiempo
    saveUninitialized: true,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", routes);
app.use("/", viewsRoutes);

const httpServer = app.listen(envsConfig.PORT, () => {
  console.log(`Server listening to port: ${envsConfig.PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
});

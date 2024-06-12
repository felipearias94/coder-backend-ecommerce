import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import routes from "./routes/index.routes.js";
import viewsRoutes from "./routes/views.routes.js";

import { Server } from "socket.io";
import { connectToDB } from "./config/db.config.js";

const PORT = process.env.PORT || 8080;
const app = express();

connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/api", routes);
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () => {
  console.log(`Servidor escuchando desde el puerto ${PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");
});

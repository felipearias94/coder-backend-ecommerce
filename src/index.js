import express from "express";
import routes from "./routes/index.routes.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando desde el puerto ${PORT}`);
});

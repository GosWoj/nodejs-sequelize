import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";
import { getErrorPage } from "./controllers/error.js";
import { sequelize } from "./util/database.js";

const app = express();

//Setting up ejs
app.set("view engine", "ejs");
app.set("views", "views");

const __direname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__direname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage);

//It syncs the models to the database
sequelize
  .sync()
  .then((data) => {
    // console.log(data);
    // app.listen(3000);
  })
  .catch((error) => console.log(error));

app.listen(3000);

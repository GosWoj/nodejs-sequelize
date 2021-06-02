import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";
import { getErrorPage } from "./controllers/error.js";

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

app.listen(3000);

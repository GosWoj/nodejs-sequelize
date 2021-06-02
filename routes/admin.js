import express from "express";
import {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} from "../controllers/admin.js";

export const router = express.Router();

router.get("/add-product", getAddProduct);

router.post("/add-product", postAddProduct);

router.get("/edit-product/:id", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

router.get("/products", getProducts);

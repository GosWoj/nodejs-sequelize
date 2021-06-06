import express from "express";
import {
  getIndex,
  getProduct,
  getProducts,
  getCart,
  postCart,
  postCartDeleteItem,
  getCheckout,
  getOrders,
  postOrder,
} from "../controllers/shop.js";

export const router = express.Router();

router.get("/", getIndex);

router.get("/product/:id", getProduct);

router.get("/products", getProducts);

router.get("/cart", getCart);

router.post("/cart", postCart);

router.post("/cart-delete-item", postCartDeleteItem);

router.get("/checkout", getCheckout);

router.get("/orders", getOrders);

router.post("/create-order", postOrder);

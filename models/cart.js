import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __direname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__direname, "..", "data", "cart.json");

export default class Cart {
  static addProduct(id, price) {
    //Fetch previous cart
    fs.readFile(filePath, (error, data) => {
      let cart = { products: [], totalPrice: 0 };

      if (!error) {
        cart = JSON.parse(data);
      }
      //Check if product is already in the cart
      const addedProductIndex = cart.products.findIndex((p) => p.id === id);
      const addedProduct = cart.products[addedProductIndex];
      let updatedProduct;

      //Add or increase product
      if (addedProduct) {
        updatedProduct = { ...addedProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        //Increasing and replacing previous product
        cart.products = [...cart.products];
        cart.products[addedProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id, quantity: 1 };
        //Adding a new product to cart
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(filePath, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }
  static deleteProduct(id, price) {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        return;
      } else {
        const updatedCart = { ...JSON.parse(data) };
        //Finding product to determinate quantity
        const product = updatedCart.products.find(
          (product) => product.id === id
        );
        //If there is no product in the cart, don't continue
        if (!product) {
          return;
        }
        //Filtering out the product
        updatedCart.products = updatedCart.products.filter(
          (product) => product.id !== id
        );
        updatedCart.totalPrice =
          updatedCart.totalPrice - price * product.quantity;

        fs.writeFile(filePath, JSON.stringify(updatedCart), (error) => {
          console.log(error);
        });
      }
    });
  }
  static getCart(callback) {
    fs.readFile(filePath, (error, data) => {
      const cart = JSON.parse(data);
      if (error) {
        callback(null);
      } else {
        callback(cart);
      }
    });
  }
}

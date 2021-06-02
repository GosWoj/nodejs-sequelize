import Cart from "./cart.js";
import { db } from "../util/database.js";

export class Product {
  constructor(id, name, price, image, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
  }

  save() {
    return db.execute(
      "INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)",
      [this.name, this.price, this.description, this.image]
    );
  }

  static delete(id) {}

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static fetchProduct(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
}

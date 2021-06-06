import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { router as adminRoutes } from "./routes/admin.js";
import { router as shopRoutes } from "./routes/shop.js";
import { getErrorPage } from "./controllers/error.js";
import { sequelize } from "./util/database.js";
import { Product } from "./models/product.js";
import { User } from "./models/user.js";
import { Cart } from "./models/cart.js";
import { CartItem } from "./models/cart-item.js";
import { Order } from "./models/order.js";
import { OrderItem } from "./models/order-item.js";

const app = express();

//Setting up ejs
app.set("view engine", "ejs");
app.set("views", "views");

const __direname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__direname, "public")));

//Creating middleware, so I can use User created at the bottom
//anywhere in the app
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((error) => console.log(error));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getErrorPage);

//Defining relation between models
Product.belongsTo(User, {
  //Second argument is optional
  constraints: true,
  //If user is deleted than products that he/she created
  //will also be deleted
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

//It syncs the models to the database
sequelize
  .sync()
  // .sync({
  //   //It should only be used in development
  //   //It reflects changes
  //   //It makes everything in the tables gone
  //   force: true,
  // })
  .then((data) => {
    // console.log(data);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Mary",
        email: "test@gmail.com",
      });
    } else {
      //You should always return the same type
      //Above it returns promise and below without
      //Promise.resolve() it would return an object
      return Promise.resolve(user);
    }
  })
  .then((user) => {
    // console.log(user);
    //Creating dummy cart
    // return user.createCart();
    user.getCart().then((cart) => {
      if (cart) {
        return cart;
      } else {
        return user.createCart();
      }
    });
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((error) => console.log(error));

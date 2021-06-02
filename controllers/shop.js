import { Product } from "../models/product.js";
import Cart from "../models/cart.js";

export const getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        products: rows,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getProduct = (req, res, next) => {
  const id = req.params.id;
  Product.fetchProduct(id)
    .then(([product]) => {
      res.render("shop/product", {
        pageTitle: product[0].name,
        product: product[0],
      });
    })
    .catch((error) => console.log(error));
};

export const getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        path: "/products",
        pageTitle: "Products",
        products: rows,
        hasProducts: rows.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Cart",
        products: cartProducts,
      });
    });
  });
};

export const postCart = (req, res, next) => {
  const id = req.body.productID;
  Product.fetchProduct(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
};

export const postCartDeleteItem = (req, res, next) => {
  const productID = req.body.productID;
  Product.fetchProduct(productID, (product) => {
    Cart.deleteProduct(productID, product.price);
    res.redirect("/cart");
  });
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

export const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders",
  });
};
